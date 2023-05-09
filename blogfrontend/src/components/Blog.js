import { useState } from 'react'
const Blog = ({ blog, likeABlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const handleLike = () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      likes: blog.likes + 1
    }
    likeABlog(updatedBlog)
  }
  const showRemove = (user) => {
    if (user) {
      if (user.username === blog.user.username) {
        return (
          <button className="removebutton"
            onClick={deleteBlog}>
                        remove
          </button>
        )
      }
    }
    return null
  }

  return (
    <div className="blog">
      <div className="title" style={hideWhenVisible} >
        <span>{blog.title}, {blog.author}</span>
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="fullBlog">
        <ul>
          <h3>{blog.title} , {blog.author}</h3>
          <li><h4> author: {blog.author}</h4> </li>
          <li> <h4> url: {blog.url}</h4></li>
          <li>
            <h4>
              likes:
              {blog.likes}
              <button onClick={handleLike} className='likebutton'>like</button>
            </h4>

          </li>

          {blog.user.name}


          <button onClick={() => setVisible(false)}>hide</button>
        </ul>
        {showRemove(user)}
      </div>
    </div>
  )
}

export default Blog