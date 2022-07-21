import request from '@/untis/request'
const statistics1 = () => {
  return request({ url: '/admin/statistics1', method: 'GET' })
}
const statistics2 = () => {
  return request({ url: '/admin/statistics2', method: 'GET' })
}
const statistics3 = (data) => {
  return request({ url: `/admin/statistics3?type=${data}`, method: 'GET' })
}
export default { statistics1, statistics2, statistics3 }
