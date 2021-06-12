const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() 
}
const restaurantData = require('./restaurant.json')
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  { name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
 { name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  let userSeeder = async (users) => {
    try {
  let data = await users.forEach((user, index) => {  
    bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash =>  
      User.create({
      name: user.name,
      email: user.email,
      password: hash
      })
    )   
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length:3 },(_, i) => 
      Restaurant.create({...restaurantData.results[i + (index * 3)], userId})     
        ))
    }) 
    .then(() => {
      console.log('done.')
      process.exit()
    })
  })
  console.log(data)
    } catch (err) {
      console.warn(err)
    }
  }
    userSeeder(SEED_USER)
})






