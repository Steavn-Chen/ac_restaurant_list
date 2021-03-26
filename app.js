const express = require('express')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const methodOverride = require('method-override')

const routes = require('./routes')

const app = express()

const post = 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(post, () => {
  console.log(`Espress is listening on localhost: ${post}`)
}) 

 

