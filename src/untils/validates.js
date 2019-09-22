/* 
  自定义表单正则验证模块
*/

/* 姓名校验 由2-10位汉字组成 */
export function username(str) {
  const reg = /^[\u4e00-\u9fa5]{2,10}$/
  return reg.test(str) 
}

/* 手机号校验 由以1开头的11位数字组成  */
export function password(str) {
  const reg = /^1\d{10}$/
  return reg.test(str) 
}

/* 邮箱校验 */
export function email(str) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}