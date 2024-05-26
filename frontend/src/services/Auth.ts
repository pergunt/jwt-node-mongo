import {API} from 'configs'
import {User} from 'types'

export const login = async (email: string, password: string)=> {
  return API.post<User>('/login', {email, password})
}

export const register = async (email: string, password: string)=> {
  return API.post<User>('/register', {email, password})
}

export const logout = async ()=> {
  return API.post('/logout')
}
