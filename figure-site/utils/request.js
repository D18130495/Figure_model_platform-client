import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookies from 'js-cookie'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8020',
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if(cookies.get('token')) {
      config.headers['token'] = cookies.get('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code === 208) {
      loginEvent.$emit('loginDialogEvent')
      return;
    }else {
      // if the custom code is not 200, it is judged as an error.
      if(res.code !== 200) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
