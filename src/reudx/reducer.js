/*
  包含了n个reducer 函数的模块
  根据老的 state 和 action对象来生成新的饿state 
  这里的action对象由aciton creator 提供
*/

import { combineReducers } from 'redux'
import storeUntils from '../untils/store'

import {
  SET_HEAD_TITLE,
  RESET_USER,
  RECEIVE_USER
} from './action-types'


// 管理头部标题的reducer函数
const initHeadTitle = '首页'

function headTitle (state=initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

// 管理当前用户的reducer函数
const initUser = storeUntils.getUser()

function user (state=initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case RESET_USER:
      return {}
    default:
      return state
  }
}


export default combineReducers({
  headTitle,
  user
})