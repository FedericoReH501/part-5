const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

jest.setTimeout(65000)

beforeEach(async() => {
    await User.deleteMany({})

    const UserAtBegin = new User({
        username:'TesterUsername',
        name:'tester',
        passwordHash: await bcrypt.hash('sekret', 10)
    })
    await UserAtBegin.save()
})

describe('One user altready on Database',() => {
    test('Recived Right amount & Right json format of users',async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(1)
    })

    test('Adding a Valid New User',async() => {
        const usersAtStart = await User.find({})

        const userToAdd = {
            username:'NewUser',
            name:'NewName',
            password:'password',
        }
        await api.post('/api/users').send(userToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const userNames = usersAtEnd.map(u => u.username)
        expect(userNames).toContain('NewUser')
    })

    describe('creation fails with proper status code and message if invalid user is submitted',() => {
        test('User with Already taken Username creation fails',async () => {
            const usersAtStart = await User.find({})

            const userToAdd = {
                username:'TesterUsername',
                name:'NewName',
                password:'newpassword',
            }
            const result = await api.post('/api/users').send(userToAdd)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(result.body.error).toContain('expected `username` to be unique')

            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })
        test('User with Invalid Password  creation fails',async () => {
            const usersAtStart = await User.find({})

            const userToAdd = {
                username:'ValidUsername',
                name:'NewName',
                password:'ne',
            }
            const result = await api.post('/api/users').send(userToAdd)
                .expect(400)
            expect(result.body.error).toContain('expected `password` to be atleast 3 characters lenght')

            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })
    })

})