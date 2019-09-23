import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE_API = ''

export const reqLogin = ({username, password}) => ajax(BASE_API + '/login', {username, password}, 'POST')

export const reqRegistry = ({username, password}) => ajax(BASE_API + '/registry', {username, password}, 'POST')


// 获取天气的数据： 使用jsonp 的方式
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, response) => {
      if (!err && response.status === 'success') {
        const { dayPictureUrl, weather } = response.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('获取天气失败了')
      }
    })
  })
}