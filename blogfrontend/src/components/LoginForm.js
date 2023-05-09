import { useState } from 'react'

const LoginForm = ({ logUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createUserToLog = (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    const userToLog = { username, password }
    logUser(userToLog)
    setUsername('')
    setPassword('')

  }

  return (
    <div>
      <h2>Login to Application</h2>
      <form onSubmit={(event) => createUserToLog(event)}>
        <div>
                    Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)
            }
          >
          </input>
        </div>
        <button id='loginbutton' type="submit" >Log in</button>
      </form>
    </div>
  )
}
export default LoginForm