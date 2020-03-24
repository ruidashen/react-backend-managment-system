const mongoose = require('mongoose')
const express = require('express')
const app = express() 


app.use(express.static('public'))

app.use(express.urlencoded({extended: true})) 
app.use(express.json()) 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const indexRouter = require('./routers')
app.use('/', indexRouter)  //

const fs = require('fs')


mongoose.connect('mongodb+srv://ruidashen:gqtygjhidt1124@cluster0-td9hi.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Mongodb connected!!!')
    app.listen('5001', () => {
      console.log('Database is now connected at http://localhost:5001')
    })
  })
  .catch(error => {
    console.error('Connect to databse failed', error)
  })

