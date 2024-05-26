import {useEffect, useContext} from 'react';
import {LoginForm, Users} from 'components'
import {Context} from 'configs'
import {observer} from 'mobx-react-lite'

function App() {
  const {store} = useContext(Context)

  useEffect(() => {
    if (store.user) {
      return
    }

    store.authenticate()
  }, [])

  if (store.loading) {
    return <div>Loading...</div>
  }

  if (!store.user) {
    return <LoginForm />
  }

  return (
    <div className="App">
      <h2>
        {store.user.email}
      </h2>
      <h2>
        {store.user.activated ? 'Active' : 'Not activated'}
      </h2>
      <Users />
      <button
        onClick={() => {
          store.logout()
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default observer(App)
