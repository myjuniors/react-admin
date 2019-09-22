import ajax from './ajax'

const BASE_API = ''

export const reqLogin = ({username, password}) => ajax(BASE_API + '/login', {username, password}, 'POST')

export const reqRegistry = ({username, password}) => ajax(BASE_API + '/registry', {username, password}, 'POST')