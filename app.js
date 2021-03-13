const express = require('express')
const app = express()
const post = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const { monitorEventLoopDelay } = require('perf_hooks')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

app.listen(post, () => {
  console.log(`Expredd is listening on localhost${post}`)
}) 
