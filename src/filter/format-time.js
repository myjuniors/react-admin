import moment from 'moment'

export const getTime = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}