import request from '@/untis/request'

export const login = (data) => {
  return request({ url: '/admin/login', data, method: 'POST' })
}
export const getUserInfo = () => {
  return request({ url: '/admin/getinfo', method: 'POST' })
}
export const logout = () => {
  return request({ url: '/admin/logout', method: 'POST' })
}
