const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantData.results.forEach(restaurant => {
    Restaurant.create(restaurant)
  })
  console.log('done')
})

