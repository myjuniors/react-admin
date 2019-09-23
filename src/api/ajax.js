import axios from 'axios'
import { message } from 'antd'
import NProgress from 'nprogress'
// 设置超时时间
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => { // 请求之前加loading
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(config => { // 响应成功关闭loading
  NProgress.done()
  return config
}, error => {
  return Promise.reject(error)
})

export default function ajax(url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        message.error('请求错误：' + error.message)
      })
  })
}