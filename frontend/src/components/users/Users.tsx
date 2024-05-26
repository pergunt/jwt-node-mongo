import {FC, useState, useEffect} from 'react'
import {Users} from 'services'
import {User} from 'types'

const UsersComponent: FC = () => {
  const [state, setState] = useState<{
    loading: boolean;
    users: User[];
  }>({
    loading: false,
    users: []
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true
    }))

    Users.list()
      .then(result => {
        setState({
          users: result.data,
          loading: false
        })
      })
      .catch(() => {

        setState(prevState => ({
          ...prevState,
          loading: false
        }))
      })
  }, []);

  return (
        <div>
          {state.users.map(item => (
            <p key={item.email}>{item.email}</p>
          ))}
        </div>
    )
}

export default UsersComponent
