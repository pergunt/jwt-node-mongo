import {FC, useState, useContext} from 'react'
import {Context} from 'configs'
import {observer} from 'mobx-react-lite'

const LoginForm: FC = () => {
  const {store} = useContext(Context)
  const [state, setState] = useState({
    email: '',
    password: ''
  })

    return (
        <form
          onSubmit={(e) => {
            e.preventDefault()

            store.login(state.email, state.password)
          }}
        >
          <input
            type='email'
            placeholder='Email'
            value={state.email}
            onChange={e => {
              setState(prevState => ({
                  ...prevState,
                  email: e.target.value
              }))
            }}
          />
          <input
            type='password'
            placeholder='Password'
            value={state.password}
            onChange={e => {
              setState(prevState => ({
                  ...prevState,
                password: e.target.value
              }))
            }}
          />
          <button type='submit'>
            Submit
          </button>
          <button
            type='button'
            onClick={() => {
              store.register(state.email, state.password)
            }}
          >
            Register
          </button>
        </form>
    )
}

export default observer(LoginForm)
