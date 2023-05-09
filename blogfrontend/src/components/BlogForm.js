import { useState } from 'react'

const BlogForm = ({
  createBlog,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={(event) => addBlog(event)}>
                Title
        <input  className='titlein' type="text" value={title} onChange={({ target }) => setTitle(target.value)}></input><br></br>
                Author
        <input className='authorin' type="text" value={author} onChange={({ target }) => setAuthor(target.value)}></input><br></br>
                URL
        <input className='urlin' type="text" value={url} onChange={({ target }) => setUrl(target.value)}></input><br></br>
        <button type="submit" id='newformbutton'>Post New Blog</button>
      </form>
    </div>
  )
}
export default BlogForm