const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() 
}
const restaurantData = require('./restaurant.json')
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurant = require('../restaurant')
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
  SEED_USER.forEach((user, index) => { 
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
      // 展開運算子用法
      Restaurant.create({...restaurantData.results[i + (index * 3)], userId})
        // Restaurant.create({
        //   name: `${restaurantData.results[i + (index * 3)].name}`,
        //   name_en: `${restaurantData.results[i + (index * 3)].name_en}`,
        //   category: `${restaurantData.results[i + (index * 3)].category}`,
        //   image: `${restaurantData.results[i + (index * 3)].image}`,
        //   location: `${restaurantData.results[i + (index * 3)].location}`,
        //   phone: `${restaurantData.results[i + (index * 3)].phone}`,
        //   google_map: `${restaurantData.results[i + (index * 3)].google_map}`,
        //   rating: `${restaurantData.results[i + (index * 3)].rating}`,
        //   description: `${restaurantData.results[i + (index * 3)].description}`,
        //   userId: userId
        //  })  
        ))
    }) 
    .then(() => {
      console.log('done.')
      process.exit()
    })
  })
})

  


  