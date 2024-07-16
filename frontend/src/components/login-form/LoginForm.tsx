import {FC, useState, useContext, SyntheticEvent} from 'react'
import {Context} from 'configs'
import {observer} from 'mobx-react-lite'
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from './LoginForm.module.css'

const LoginForm: FC = () => {
  const {store} = useContext(Context)
  const [state, setState] = useState({
    email: '',
    password: ''
  })

    return (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()

            store.login(state.email, state.password)
          }}
        >
          <FloatLabel>
            <InputText
              id="email"
              type='email'
              value={state.email}
              onChange={e => {
                setState(prevState => ({
                  ...prevState,
                  email: e.target.value
                }))
              }}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="password"
              type='password'
              value={state.password}
              onChange={e => {
                setState(prevState => ({
                  ...prevState,
                  password: e.target.value
                }))
              }}
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>
          <div className={styles.buttons}>
            <Button
              label="Submit"
              type='submit'
            />
            <Button
              label="Register"
              type='button'
              onClick={() => {
                store.register(state.email, state.password)
              }}
            />
          </div>
        </form>
    )
}

export default observer(LoginForm)
