const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const post = 3000

const RestaurantList = require('./models/restaurant')

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

app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/newRes', (req,res) => {
  res.render('newRes')
})

app.post('/restaurants',(req,res) => {
  const newbody = req.body
  return RestaurantList.create(newbody)
  .then(() => {res.redirect('/')})
  .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const body = req.body
  return RestaurantList.findById(id)
    .then(restaurant => {
      restaurant.name = body.name 
      restaurant.name_en = body.name_en
      restaurant.category = body.category 
      restaurant.image = body.image
      restaurant.location = body.location 
      restaurant.phone = body.phone
      restaurant.google_map = body.google_map 
      restaurant.phone = body.phone
      restaurant.rating = body.rating 
      restaurant.description = body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


app.post('/restaurants/:restaurant_id/delete', (req,res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  RestaurantList.find()
    .lean()
    .then(restaurants => { 
      const searchRestaurants = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: searchRestaurants, keyword: keyword })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
   const id = req.params.restaurant_id
  RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

app.listen(post, () => {
  console.log(`Espress is listening on localhost: ${post}`)
}) 

 

