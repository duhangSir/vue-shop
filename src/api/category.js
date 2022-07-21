import request from '@/untis/request'
const getGoods = (count, data) => {
  console.log(data)
  return request({
    url: `admin/goods/${count}`,
    method: 'GET',
    data
  })
}
const getCategory = () => {
  return request({ url: '/admin/category', method: 'GET' })
}

export default { getGoods, getCategory }
