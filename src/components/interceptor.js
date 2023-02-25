import axios from 'axios'

export const httpClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const interceptor = () => {
  httpClient.interceptors.request.use(
    (config) => {
      if (!localStorage.getItem('token')) {
        localStorage.clear()
        window.location.href = '/#/login'
      }
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  httpClient.interceptors.response.use(
    (response) => {
      console.log(response)
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear()
        window.location.href = '/#/login'
      }
      return Promise.reject(error)
    },
  )
}
