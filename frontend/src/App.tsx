import {useEffect, useContext} from 'react';
import {LoginForm, Users, UserInfo} from 'components'
import {Context} from 'configs'
import {observer} from 'mobx-react-lite'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from './App.module.css'

function App() {
  const {store} = useContext(Context)

  useEffect(() => {
    if (store.user) {
      return
    }

    store.authenticate()
  }, [])

  let component = null

  if (store.loading) {
    component = <ProgressSpinner />
  } else if (!store.user) {
    component = <LoginForm />
  }  else {
    component = (
      <div>
        <UserInfo user={store.user} />
        <Users />
        <Button
          label="Log out"
          onClick={() => {
            store.logout()
          }}
        />
      </div>
    )
  }

  return (
    <div className={styles.app}>
      {component}
    </div>
  )
}

export default observer(App)
