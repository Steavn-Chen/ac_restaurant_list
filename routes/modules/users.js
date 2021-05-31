const express = require('express')
const router = express.Router()
const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得註冊表單的參數
  const { name, email, password, confirmPassword } = req.body
  //從拿到的參數跟資料庫比對是否己經註冊
  User.findOne({ email }).then(user => {
  //如果己經註冊,就返回到註冊頁
    if (user) {
      console.log('此帳號己經註冊')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })      
    } 
    //如果還還未註冊,就把表單來的資料寫入資料庫
      else { 
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
})

module.exports = router