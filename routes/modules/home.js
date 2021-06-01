const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  RestaurantList.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

module.exports = router