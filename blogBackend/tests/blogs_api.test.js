const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

jest.setTimeout(65000)

const initialBlogs = [
    {
        title: 'Ziggy Stardust',
        author: 'David Bowie',
        url: 'www.loremipsum.it',
        likes: 0
    },
    {
        title: 'wonderwall',
        author: 'oasis',
        url: 'www.loremipsum.it',
        likes: 12
    },
    {
        title: 'Thunderstruck',
        author: 'AC/DC',
        url: 'www.loremipsum.it',

    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const UserAtBegin = {
        username:'TesterUsername1',
        name:'tester',
        password: 'Benni1996!',
    }
    await api.post('/api/users').send(UserAtBegin)
    const user = await User.find()
    for (let blog of initialBlogs) {
        blog.user = user[0]._id
        let blogToAdd = new Blog(blog)
        await blogToAdd.save()
    }

})

describe('DB initialized correctly', () => {


    test('recived the right amount of Blogs in Json ', async () => {

        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(initialBlogs.length)


    })

    test('id is defined correctly', async () => {
        const newBlog = new Blog({
            title: 'Newblog',
            author: 'federico re',
            url: 'www.loremipsum.it',
            likes: 100
        })

        await newBlog.save()
        expect(newBlog.id).toBeDefined()
    })
})

describe('Addition of a new Blog', () => {

    test('post a new blog', async () => {
        const newBlog = {
            title: 'Newblog',
            author: 'federico re',
            url: 'www.loremipsum.it',
            likes: 100
        }
        const userToLog = {
            username:'TesterUsername1',
            password:'Benni1996!'
        }

        const loggedUser = await api.post('/api/login')
            .send(userToLog)
        const token = `Bearer ${loggedUser.body.token}`
        console.log('token sent:',token)
        await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', token)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedBlogs = await api.get('/api/blogs')
        expect(updatedBlogs.body).toHaveLength(initialBlogs.length + 1)

        const titles = updatedBlogs.body.map(b => b.title)
        expect(titles).toContain('Newblog')
    })

    test('Unauthorized blog not posted with proper status code',async () => {
        const newBlog = {
            title: 'Newblog',
            author: 'federico re',
            url: 'www.loremipsum.it',
            likes: 100
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)


        const updatedBlogs = await api.get('/api/blogs')
        expect(updatedBlogs.body).toHaveLength(initialBlogs.length )
    })

    test('unspecified likes set to 0', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[2].likes).toEqual(0)

    })

    test('Incomplete Blogs validation', async () => {
        const newBlog = {
            author: 'federico re',
            url: 'www.loremipsum.it',
            likes: 100
        }
        const userToLog = {
            username:'TesterUsername1',
            password:'Benni1996!'
        }

        const loggedUser = await api.post('/api/login')
            .send(userToLog)
        const token = `Bearer ${loggedUser.body.token}`
        console.log('token sent:',token)
        await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', token)
            .expect(400)

        const updatedBlogs = await api.get('/api/blogs')
        expect(updatedBlogs.body).toHaveLength(initialBlogs.length)

    })
})

describe('Modify blog on database',() => {

    test('delete a blog', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[2].id
        const userToLog = {
            username:'TesterUsername1',
            password:'Benni1996!'
        }

        const loggedUser = await api.post('/api/login')
            .send(userToLog)
        const token = `Bearer ${loggedUser.body.token}`

        await api.delete(`/api/blogs/${id}`)
            .set('Authorization', token)
            .expect(204)
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)
    })

    test('Update an existing  Blog', async () => {
        const newBlog = {
            author: 'Beatrice aquaro',
            url: 'www.loremipsum.it'
        }

        const response = await api.get('/api/blogs')
        const id = response.body[2].id
        await api.put(`/api/blogs/${id}`)
            .send(newBlog)
        const updatedBlogs = await api.get('/api/blogs')
        expect(updatedBlogs.body[2].author).toEqual('Beatrice aquaro')

    })
})


afterAll(async () => {
    await mongoose.connection.close()
})