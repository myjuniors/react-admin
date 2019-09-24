import ajax from './ajax'

const BASE_API = ''

export const reqCategoryList = ({parentId}) => ajax(BASE_API + '/getCategoryList', {parentId})

export const reqAddCategory = ({parentId, categoryName}) => ajax(BASE_API + '/addCategory', {parentId, categoryName}, 'POST')

export const reqUpdateCategory = (reqData) => ajax(BASE_API + '/updateCategory', reqData, 'POST')
