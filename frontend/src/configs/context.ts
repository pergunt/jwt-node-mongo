import Store from 'store'
import {createContext} from 'react'

const store = new Store()

const Context = createContext({
  store
})

export default Context
