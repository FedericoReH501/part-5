const totalLikes = (blogs) => {
    let sum = (sum, blog) => sum + blog.likes
    return blogs.lenght == 0
        ? 0
        : blogs.reduce(sum, 0)
}


const favouriteBlog = (blogs) => {
    let winner = { likes: 0 }
    const reducer = (winner, blog) => {
        if (blog.likes > winner.likes) {
            winner = blog
        }
        return winner
    }

    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer, winner)

}

const mostBlog = (blogs) => {
    const authors = []
    const bloggers = []
    let result = {}
    let max = 0
    if (blogs.length === 1) {
        return { author: blogs[0].author, posts: 1 }
    }
    blogs.forEach(blog => {
        if (!authors.includes(blog.author)) {
            authors.push(blog.author)
            bloggers.push({ author: blog.author, posts: 1 })
        }

        else {
            const index = bloggers.findIndex(blogger => blogger.author === blog.author)
            bloggers[index].posts += 1
            if (bloggers[index].posts > max) {
                max = bloggers[index].posts
                result = bloggers[index]
            }
        }
    })
    return blogs.length === 0
        ? {}
        : result
}

const mostLikes = (blogs) => {
    let authors = []
    let bloggers = []
    let result = {}
    let max = 0
    if (blogs.length === 1) {
        result = { author: blogs[0].author, likes: blogs[0].likes }
        return result
    }
    blogs.forEach(blog => {

        if (!authors.includes(blog.author)) {
            authors.push(blog.author)
            bloggers.push({ author: blog.author, likes: blog.likes })
        }

        else {
            const index = bloggers.findIndex(blogger => blogger.author === blog.author)
            bloggers[index].likes += blog.likes

            if (bloggers[index].likes > max) {
                max = bloggers[index].likes
                result = bloggers[index]
            }
        }
    })
    return blogs.length === 0
        ? {}
        : result
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlog, mostLikes
}