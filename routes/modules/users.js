const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得註冊表單的參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if  (!email || !password || !confirmPassword ) {
    errors.push({ message: '除了名字其他欄位務必填寫.'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一樣.'})
  }
  if (errors.length) {
    return res.render('register' , {
      errors,
      name, 
      email, 
      password, 
      confirmPassword
    })
  }
  //從拿到的參數跟資料庫比對是否己經註冊
  User.findOne({ email }).then(user => {
  //如果己經註冊,就返回到註冊頁
    if (user) {
      errors.push({ message: '該電子郵件己經註冊了.'})
      return  res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })      
    } 
    //如果還還未註冊,就把表單來的資料寫入資料庫
      // else { 
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password:hash
        }))
      // return User.create({
      //   name,
      //   email,
      //   password
      // })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    // }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你己成功登出.')
  res.redirect('/users/login')
})


module.exports = router