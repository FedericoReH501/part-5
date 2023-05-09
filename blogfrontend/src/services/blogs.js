import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(blogs => blogs.data)
}
const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}
const postNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token, }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token, }
  }
  await axios.delete(`${baseUrl}/${id}`, config)

}

export default { getAll, postNew, setToken, update, remove }