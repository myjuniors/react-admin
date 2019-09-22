/*
  localStorage 存储模块
 */

import store from 'store'

const USER_KEY = 'user-key'

export default {
  saveUser (user) {
    return store.set(USER_KEY, user)
  },
  getUser () {
    return store.get(USER_KEY) || {}
  },
  removeUser () {
    return store.remove(USER_KEY)
  }
}