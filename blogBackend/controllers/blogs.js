const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, })
    return response.json(blogs)

})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    body.user = user._id
    const blog = new Blog(body)
    const result = await blog.save()
    const addedBlog = await Blog.findById(result.id).populate('user', { username: 1, name: 1, })
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(addedBlog)

})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user
    const userid = user.id
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === userid.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
    return response.status(401).json({ error: 'Only the author can remove the blog' })
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', { username: 1, name: 1, })
    response.json(updatedBlog)
})

module.exports = blogsRouter