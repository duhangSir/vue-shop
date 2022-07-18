import axios from 'axios'
import store from '@/store'
import { ElNotification } from 'element-plus'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  (error) => {
    console.log(error.response)
    ElNotification({
      title: '提示',
      message: error.response.data.msg,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return instance(options)
}

export default request
