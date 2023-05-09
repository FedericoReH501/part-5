const { response } = require('express')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://federicore1996:Benni1996%21@fullstackcourse.c74yqjk.mongodb.net/bloglist?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)
    .then(
        console.log('connected to MongoDB')
    )
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blog = new Blog({
    title: 'Ziggy Stardust',
    author: 'David Bowie',
    url: 'www.loremipsum.it',
    likes: 0
})

blog.save()
    .then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
