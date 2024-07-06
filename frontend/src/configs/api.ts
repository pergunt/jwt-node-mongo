import axios from 'axios';
import {User} from "../types";

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
})

API.interceptors.response.use(config => config, async (error) => {
  if (error.response.status === 401 && error.config && !error.config.retry) {
    error.config.retry = true
    try {
      await axios.get<User>('/refresh', {
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true
      })

      return API.request(error.config)
    } catch (e) {
      console.log('not authorized')
    }
  } else {
    throw error
  }
})

export default API
