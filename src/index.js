const express = require('express')
const app = express()

const {config} = require('./config')
const movieAPI = require('./routes/movie.route')

const {logError, wrapError, errorHandler} = require('./utils/middleware/error.handler')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

//parse
app.use(express.json())

//routes
movieAPI(app)

//catch 404 http code
app.use(notFoundHandler)

//Error middleware
app.use(logError)
app.use(wrapError)
app.use(errorHandler)


app.listen(config.port, (err)=>{
    if(err) throw new Error(err)

    console.log(`Magic is happening on your machine: http://localhost:${config.port}`)
})