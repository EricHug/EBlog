import UserApi from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'


const user = {
  state: {
    token: getToken(),
    avatar: null,
    name: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AVATAR_URL: (state, value) => {
      state.avatarUrl = value
    },
    SET_NAME: (state, value) => {
      state.name = value
    },
    SET_LOCATION: (state, value) => {
      state.location = value
    },
    SET_BLOG: (state, value) => {
      state.blog = value
    },
    SET_FOLLOWERS: (state, value) => {
      state.followers = value
    },
    SET_FOLLOWING: (state, value) => {
      state.following = value
    }
  },

  actions: {
    // 登录
    Login({
      commit,
      userInfo
    }) {
      const name = userInfo.username.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {
        UserApi.login({
          name,
          password
        }).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 注销
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        UserApi.logout(state.token).then(response => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        UserApi.getUserInfo().then(response => {
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
