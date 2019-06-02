import axios from 'axios'
// import router from '@/router'

// import sysConfig from '@/utils/sysConfig'

const service = axios.create({
  baseURL: 'http://haopengzh.cn:3001',
  // baseURL: 'http://192.168.108.125',
  timeout: 30 * 1000
})

service.interceptors.request.use(config => {
  let token = window.localStorage.getItem('haopengzh_token')
  console.log(token)
  config.headers['Authorization'] ='Bearer '+token;
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let msg = ''
    try {

      msg = error.response.data.message
    } catch (e) {
      msg = error.message
    }
    console.log(msg)
    return Promise.reject(error)
  })

export default service
