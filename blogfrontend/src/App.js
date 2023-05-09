import { useEffect, useState, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Toggable from './components/Toggable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState(null)
  const [errornotify, setErronotify] = useState(null)

  const blogFormRef = useRef()
  function compareNumbers(a, b) {
    return b.likes - a.likes
  }
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort(compareNumbers)))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const logUser = async (userToLog) => {
    try {
      const user = await loginService.login(userToLog)
      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotify('Logged in succesfully')
      setTimeout(() => setNotify(null), 5000)
    } catch (exeption) {
      setErronotify('Login Error')
      setTimeout(() => setErronotify(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogsappUser'
    )
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.postNew(newBlog)
      const updatedBloglist = blogs.concat(response.data)
      blogFormRef.current.toggleVisibility()
      setBlogs(updatedBloglist)
      setNotify('New Blog added Succesfully')
      setTimeout(() => setNotify(null), 2000)
    } catch (error) {
      setErronotify('New Blog Not Added')
      setTimeout(() => setErronotify(null), 5000)
    }
  }

  const likeABlog = async (updatedBlog) => {
    try {
      const response = await blogService.update(updatedBlog)
      const updatedBloglist = blogs
        .map(blog => blog.id === response.data.id ? response.data : blog)
      setBlogs(updatedBloglist.sort(compareNumbers))

    }
    catch (error) {
      setErronotify('Like not added')
      setTimeout(() => setErronotify(null), 5000)
    }
  }

  const deleteBlog = async (blog) => {

    if (window.confirm(`Revome blog ${blog.title}`)) {
      try {
        await blogService.remove(blog.id)
        const updatedBlog = blogs.filter(b => b.id !== blog.id)
        setBlogs(updatedBlog)
        setNotify('Blog Removed Succesfully')
        setTimeout(() => setNotify(null), 2000)
      }
      catch (erro) {
        setErronotify('Blog not removed')
        setTimeout(() => setErronotify(null), 5000)
      }
    }
  }

  return (
    <div className="App">
      <h1>Blogs App</h1>
      <Notify notify={notify} errornotify={errornotify} />

      {!user &&
        <Toggable buttonLabel={'Login'} >
          <LoginForm
            logUser={logUser}
          />
        </Toggable>
      }
      {user &&
        <div>
          <h2> {user.username} logged in<button onClick={handleLogout}>LogOut</button></h2>

          <Toggable buttonLabel='Add New Blog' ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Toggable>
        </div>
      }

      {blogs.map(blog =>
        <Blog blog={blog}
          user={user}
          likeABlog={likeABlog}
          deleteBlog={() => deleteBlog(blog)}
          key={blog.id} />
      )}


    </div>
  )
}

export default App
