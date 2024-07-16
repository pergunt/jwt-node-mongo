import {FC} from 'react'
import {User} from 'types'

interface UserInfoProps {
  user: User;
}

const UserInfo: FC<UserInfoProps> = ({user}) => {
    return (
      <>
        <h2>
          {user.email}
        </h2>
        <h2>
          {user.activated ? 'Active' : 'Not activated'}
        </h2>
      </>
    )
}

export default UserInfo
