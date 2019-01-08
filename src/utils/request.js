import axios from 'axios'
import Vue from 'vue'
import store from '../store/index'
import {
  Message,
  MessageBox
} from 'element-ui'


const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    let token = store.state.token.token
    if (token) {
      let sp = "?"
      if (config.url.indexOf("?") >= 0) {
        sp = "&"
      }
      config.url = config.url + sp + "access_token=" + token
    }
    return config
  },
  error => {
    Message({
      message: error.response.data,
      type: 'error'
    })
    return Promise.reject('error')
  }
)


service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      Message({
        message: response.data.msg,
        type: 'error'
      })
    }
    return response
  },
  error => {
    let msg
    switch (error.response.status) {
      case 504:
        msg = "肯定是服务器出问题啦ヽ(ヽ `д′)~~"
        break
      default:
        msg = error.response.data
        break
    }
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject('error')
  }
)

export default service
