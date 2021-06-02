const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurant')

router.get('/new', (req,res) => {
  res.render('new')
})

router.post('/', (req,res) => {
  const body = req.body
  const userId = req.user._id
  // 使用物件新增數性寫入值
  Object.defineProperty(body, "userId", {
    value : userId,
    writable : true,
    enumerable : true,
    configurable : true
  });
  return RestaurantList.create(body)
  // 解構函式用法
  // const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // return RestaurantList.create({ 
  //     name,
  //     name_en,
  //     category,
  //     image,
  //     location,
  //     phone,
  //     google_map,
  //     rating,
  //     description,
  //     userId
  //     })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  })

router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return RestaurantList.findOne({ _id, userId})
    .lean()
    .then(restaurant =>  res.render('show', { restaurant: restaurant }) )
    .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return RestaurantList.findOne({ _id, userId})
    .lean()
    .then(restaurant =>  res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const body = req.body
  return RestaurantList.findOne({_id, userId })
    .then(restaurant => {
      const newRestaurant = Object.assign(restaurant,body)
      return newRestaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req,res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return RestaurantList.findOne({_id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router