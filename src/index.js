const express = require('express')
const app = express()

const {config} = require('./config')
const movieAPI = require('./routes/movie.route')

const {logError, errorHandler} = require('./utils/middleware/error.handler')

app.use(express.json())


movieAPI(app)

app.use(logError)
app.use(errorHandler)


app.listen(config.port, (err)=>{
    if(err) throw new Error(err)

    console.log(`Magic is happening on your machine: http://localhost:${config.port}`)
})