import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>',() => {

  test('form calls the event handler with right details when blog is created.',async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog}/>)

    const titleInput= container.querySelector('.titlein')
    const authorInput= container.querySelector('.authorin')
    const urlInput= container.querySelector('.urlin')
    const button= screen.getByText('Post New Blog')

    await user.type(titleInput, 'testing a form...')
    await user.type(authorInput, 'jest...')
    await user.type(urlInput, 'www.fullstack.com...')
    await user.click(button)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('jest...')
    expect(createBlog.mock.calls[0][0].url).toBe('www.fullstack.com...')

  })
})