import { setItem, getItem, removeItem } from '@/untis/storage'
import { login, getUserInfo, logout } from '@/api/login'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: '',
    iscollapse: false,
    tagsView: getItem('tagsview') || []
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
    },
    SetTagsView(state, tagsview) {
      const tags = state.tagsView.findIndex((item) => {
        return item.title === tagsview.title
      })
      if (tags === -1) {
        console.log(state.tagsView)
        state.tagsView.push(tagsview)
        setItem('tagsview', state.tagsView)
      } else {
        return false
      }
    },
    RemoveTagsView(state, { tags, Nowpath }) {
      const index = state.tagsView.findIndex((item) => {
        return item.path === tags
      })
      if (Nowpath !== tags) {
        state.tagsView.splice(index, 1)
      } else {
        const path =
          state.tagsView.length - 1 === index
            ? state.tagsView[index - 1].path
            : state.tagsView[index + 1].path
        console.log(path)
        router.push(path)
        state.tagsView.splice(index, 1)
      }
      setItem('tagsview', state.tagsView)
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
    },
    async SetTagsView({ commit }, tagsview) {
      commit('SetTagsView', tagsview)
    },
    async removeTagsView({ commit }, { tags, Nowpath }) {
      commit('RemoveTagsView', { tags, Nowpath })
    }
  }
}
