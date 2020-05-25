const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', require('./src/routes/things.routes'))
app.use('/', require('./src/routes/tags.routes'))

app.listen(3000)
