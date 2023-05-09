const helper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = helper.dummy(blogs)
    expect(result).toBe(1)
})

const emptyblogs = []

const singleblogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const multyblogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('total likes', () => {
    test('of an empty list', () => {

        const result = helper.totalLikes(emptyblogs)
        expect(result).toBe(0)
    })

    test('of a silngle a list with single blog', () => {

        const result = helper.totalLikes(singleblogs)
        expect(result).toBe(5)

    })

    test('of a big list', () => {

        const result = helper.totalLikes(multyblogs)
        expect(result).toBe(36)

    })
})


describe('favourite blog', () => {
    test('empty list', () => {

        const result = helper.favouriteBlog(emptyblogs)
        expect(result).toEqual({})
    })

    test('One item list', () => {
        const result = helper.favouriteBlog(singleblogs)
        expect(result).toEqual(singleblogs[0])
    })

    test('Big list', () => {
        const winner ={
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        }
        const result = helper.favouriteBlog(multyblogs)
        expect(result).toEqual(winner)
    })
})

describe('most blog',() => {

    test('empty list', () => {
        const result = helper.mostBlog(emptyblogs)
        expect(result).toEqual({})
    })
    test('One item list', () => {
        const result = helper.mostBlog(singleblogs)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', posts:1 })
    })
    test('multy item list', () => {
        const winner= { author: 'Robert C. Martin', posts: 3 }
        const result = helper.mostBlog(multyblogs)
        expect(result).toEqual(winner)
    })

})

describe('most likes',() => {

    test('empty list', () => {
        const result = helper.mostLikes(emptyblogs)
        expect(result).toEqual({})
    })
    test('One item list', () => {
        const result = helper.mostLikes(singleblogs)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
    })
    test('multy item list', () => {
        const winner= { author: 'Edsger W. Dijkstra', likes: 17 }
        const result = helper.mostLikes(multyblogs)
        expect(result).toEqual(winner)
    })

})