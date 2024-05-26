import {API} from 'configs'
import {User} from 'types'

export const list = () => {
  return API.get<User[]>('/users')
}

export const getByID = (id: string) => {
  return API.get<User>(`/users/${id}`)
}
