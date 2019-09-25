import ajax from './ajax'

const BASE_API = ''


export const reqAddRole = (roleName) => ajax(BASE_API + '/addRole', { roleName }, 'POST')

export const reqGetRoles = () => ajax(BASE_API + '/getRoles')

export const reqSetPremission = (role) => ajax(BASE_API + '/setPremission', role, 'POST')

