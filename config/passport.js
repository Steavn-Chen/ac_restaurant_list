const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

module.exports = app => {
  // 初始化 passport 的模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地端登入的方式
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) =>{
    User.findOne({ email })
      .then(user => {
        console.log(user)
        if (!user) { 
          return done(null,false, { message:  '這個電子郵件還未被註冊'}) 
        }
        if (user.password !== password) {
          return done(null, false, { message: ' 電子郵件或密碼不正確'})
        }
        return done(null, user)
      })
      .catch(err => done(err, null))  
  }))
  //  最後設定序列化跟反序列化
  passport.serializeUser((user,done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id,done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}