/*
  包含了n个创建aciton对象的action creator 函数模块
*/
import storeUntils from '../untils/store'
import {
  SET_HEAD_TITLE,
  RESET_USER,
  RECEIVE_USER
} from './action-types'
import { reqLogin } from '../api/common'

// 同步action 产生新的state的条件之一
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

export const logout = () => {
  storeUntils.removeUser()
  return { type: RESET_USER }
}
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

// 异步action 是一个函数，用来处理完异步请求，再dispatch分发一个同步action

export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    if (result.resultCode === 0) {
      const user = result.data
      storeUntils.saveUser(user)
      dispatch(receiveUser(user))
    }
  }
}