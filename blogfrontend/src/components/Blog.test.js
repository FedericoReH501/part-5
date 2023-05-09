import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>',() => {

  const blog ={
    title:'Testing Blog',
    author:'jest tester',
    url:'www.fullstack.com',
    likes:1,
    user:{
      name:'tester',
      username:'testerUsername'
    },
  }

  test('title is visible by default',() => {
    const { container }= render(<Blog blog={blog}/>)

    const visibleElement = container.querySelector('.title')
    const hiddenElement = container.querySelector('.fullBlog')
    expect(visibleElement).not.toHaveStyle('display: none')
    expect(hiddenElement).toHaveStyle('display: none')
  })
  test('URL & likes shown when button pressed',async () => {
    const { container }= render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const visibleElement = container.querySelector('.fullBlog')
    expect(visibleElement).not.toHaveStyle('display: none')

  })
  test('like button clicked twice, handler is called twice',async () => {
    const mockFunction =  jest.fn()
    render(
      <Blog
        blog={blog}
        likeABlog={mockFunction}
      />)

    const user = userEvent.setup()
    const viwebutton = screen.getByText('view')
    await user.click(viwebutton)
    const likebutton = screen.getByText('like')
    expect(likebutton).toBeDefined()

    await user.click(likebutton)
    setTimeout(await user.click(likebutton),10000)
    expect(mockFunction.mock.calls).toHaveLength(2)
  })
  test('form calls the event handler with right details when blog is created.',async () => {

  })
})

