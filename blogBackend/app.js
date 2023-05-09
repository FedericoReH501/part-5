const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(
        logger.info('connected to MongoDB')
    )
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use('/api/login',loginRouter)
app.use('/api/blogs',blogsRouter)
app.use('/api/users',userRouter)

app.use(middleware.errorHendler)
app.use(middleware.unknownEndpoint)

module.exports = app