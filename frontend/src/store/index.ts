import {User} from 'types'
import {makeAutoObservable} from 'mobx'
import {Auth, Users} from 'services'
import axios from 'axios'

export default class Store {
  user = null as User | null
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user: User | null) {
    this.user = user

    if (user) {
      localStorage.setItem('userID', user.id)
    } else {
      localStorage.removeItem('userID')
    }
  }

  async wrapper(fn: () => Promise<any>) {
    this.loading = true

    try {
      await fn()
    } catch (e: any) {
      console.log(e.reseponse?.data)
    }

    this.loading = false
  }
  async login(email: string, password: string) {
    this.wrapper(async () => {
      const response = await Auth.login(email, password)

      this.setUser(response.data)
    })
  }
  async register(email: string, password: string) {
    this.wrapper(async () => {
      const response = await Auth.register(email, password)

      this.setUser(response.data)
    })
  }
  async logout() {
    this.wrapper(async () => {
      await Auth.logout()

      this.setUser(null)
    })
  }

  async authenticate() {
    this.wrapper(async () => {
      const userID = localStorage.getItem('userID')

      if (!userID) {
        return
      }

      const resp = await Users.getByID(userID)

      this.setUser(resp.data)
    })
  }
}
