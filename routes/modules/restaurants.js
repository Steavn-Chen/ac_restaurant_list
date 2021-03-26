const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurant')

router.get('/newRes', (req,res) => {
  res.render('newRes')
})

router.post('/',(req,res) => {
  const newbody = req.body
  return RestaurantList.create(newbody)
  .then(() => {res.redirect('/')})
  .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const body = req.body
  return RestaurantList.findById(id)
    .then(restaurant => {
      const newrestaurant = Object.assign(restaurant,body)
      return newrestaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req,res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id', (req, res) => {
   const id = req.params.restaurant_id
  RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

module.exports = router