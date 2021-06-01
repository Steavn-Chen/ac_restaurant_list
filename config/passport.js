const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  // 初始化 passport 的模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地端登入的方式
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) =>{
    User.findOne({ email })
      .then(user => {
        if (!user) { 
          return done(null,false, { message:  '這個電子郵件還未被註冊'}) 
        }
        // 透過 bcrypt 來比對密碼
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) { 
            return done(null, false, { message: '電子郵件地址或密碼不正確'})
          }
          return done(null, user)
        })
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