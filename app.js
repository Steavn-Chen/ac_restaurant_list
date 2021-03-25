const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const post = 3000

const routes = require('./routes')

// const RestaurantList = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant-list',  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error')
})

db.once('open', () => {
  console.log('mongoDB connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

// app.get('/', (req, res) => {
//   RestaurantList.find()
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(restaurants => res.render('index', { restaurants: restaurants }))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/newRes', (req,res) => {
//   res.render('newRes')
// })

// app.post('/restaurants',(req,res) => {
//   const newbody = req.body
//   return RestaurantList.create(newbody)
//   .then(() => {res.redirect('/')})
//   .catch(error => console.log(error))
// })

// app.get('/restaurants/:restaurant_id/edit', (req, res) => {
//   const id = req.params.restaurant_id
//   return RestaurantList.findById(id)
//     .lean()
//     .then(restaurant => res.render('edit', {restaurant}))
//     .catch(error => console.log(error))
// })

// //   這是物件合併方法
// app.put('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   const body = req.body
//   return RestaurantList.findById(id)
//     .then(restaurant => {
//       const newrestaurant = Object.assign(restaurant,body)
//       return newrestaurant.save()
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })

// app.delete('/restaurants/:restaurant_id', (req,res) => {
//   const id = req.params.restaurant_id
//   return RestaurantList.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.trim()
//   RestaurantList.find()
//     .lean()
//     .then(restaurants => { 
//       const searchRestaurants = restaurants.filter(restaurant => {
//       return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//       })
//       res.render('index', { restaurants: searchRestaurants, keyword: keyword })
//     })
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/:restaurant_id', (req, res) => {
//    const id = req.params.restaurant_id
//   RestaurantList.findById(id)
//     .lean()
//     .then(restaurant => res.render('show', { restaurant: restaurant }))
//     .catch(error => console.log(error))
// })

app.listen(post, () => {
  console.log(`Espress is listening on localhost: ${post}`)
}) 

 

