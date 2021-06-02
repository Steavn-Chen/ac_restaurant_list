const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userId = req.user._id
  console.log(userId)
  RestaurantList.find()
    .lean()
    .then(restaurants => {
      console.log(restaurants)
      const searchRestaurants =  restaurants.filter(restaurant => { 
       return  restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || 
         restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())  ||
         restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
       res.render('index', { restaurants: searchRestaurants, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router



