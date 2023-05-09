const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/',async (request, response) => {
    const users = await User.find({}).populate('blogs',{ title:1,author:1,likes:1, })
    return response.json(users)
})

userRouter.post('/', async(request, response) => {
    const { username, name, password } = request.body
    if(password.length < 3){
        return response.status(400).json({
            error: 'expected `password` to be atleast 3 characters lenght'
        })
    }
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username: username,
        name: name,
        passwordHash: hash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter