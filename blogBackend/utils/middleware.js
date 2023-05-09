const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('--------')
    next()
}
const tokenExtractor = (request,response,next) => {
    const authorization = request.get('authorization')
    if(!authorization || !authorization.startsWith('Bearer ')){
        next()
        return request.token = null
    }
    request.token = authorization.replace('Bearer ','')
    next()
}
const userExtractor = async (request,response,next) => {
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}
const errorHendler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    requestLogger, errorHendler,unknownEndpoint,tokenExtractor,userExtractor
}