import ajax from './ajax'

const BASE_API = ''

export const reqCategoryList = ({parentId}) => ajax(BASE_API + '/getCategoryList', {parentId})

export const reqAddCategory = ({categoryId, categoryName}) => ajax(BASE_API + '/addCategory', {categoryId, categoryName}, 'POST')

export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE_API + '/updateCategory', {categoryId, categoryName}, 'POST')
