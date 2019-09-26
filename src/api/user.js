import ajax from './ajax'

const BASE_API = ''



export const reqGetUserList = () => ajax(BASE_API + '/getUserList')

export const reqAddOrUpdateUser = (user) => ajax(BASE_API + '/addUser', user, 'POST')

export const reqRemoveUser = (user) => ajax(BASE_API + '/removeUser', user, 'POST')



