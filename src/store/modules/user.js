import { setItem, getItem, removeItem } from '@/untis/storage'
import { login, getUserInfo, logout } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: '',
    iscollapse: false
  },
  mutations: {
    setcollapse(state) {
      state.iscollapse = !state.iscollapse
    },
    SetToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    SetUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async setToken({ commit }, ruleForm) {
      const response = await login(ruleForm)

      console.log(response)
      console.log(ruleForm)
      if (response) {
        commit('SetToken', response.data.token)
        return response
      } else {
        return ''
      }
    },
    async setUserInfo({ commit }) {
      const response = await getUserInfo()
      commit('SetUserInfo', response.data)
      return response.data
    },
    async logout({ commit }) {
      commit('SetToken', '')
      removeItem('token')
      commit('SetUserInfo', '')
      const response = await logout()
      return response
    }
  }
}
