const express = require('express')
const app = express()
require('dotenv').config()
const PORT = 3000
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log('Connected to DB!')) 

//Middlewares
app.use(express.json())
//Route 
app.use('/api/user/', authRoute)
app.use('/api/posts/', postRoute)


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`))