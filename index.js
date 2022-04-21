const express = require('express')
const rout = require('./router')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(rout)

mongoose.connect('mongodb://0.0.0.0:27017')
app.listen(6000)
