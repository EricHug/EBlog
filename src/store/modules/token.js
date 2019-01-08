import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import UserApi from '@/api/user'
import store from '../index'
import Vue from 'vue'

const token = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
      setToken(TOKEN_KEY, value)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      removeToken(TOKEN_KEY)
    }
  },

  actions: {
    Authentication({
      commit
    }, accessToken) {
      UserApi.verifyToken(accessToken).then((response) => {
        let result = response.data
        let githubUsername = store.state.configuration.githubUsername
        if (githubUsername == result['login']) {
          commit('SET_TOKEN', accessToken)
          Vue.prototype.$notify({
            title: '成功',
            message: 'Token绑定成功',
            type: 'success'
          })
          // Vue.prototype.$message({
          //     message: 'Token绑定成功',
          //     type: 'success'
          // })
        } else {
          Vue.prototype.$message({
            message: 'Token用户不一致',
            type: 'error'
          })
        }
      }).catch(() => {

      })
    },
    Cancellation({
      commit
    }) {
      commit('REMOVE_TOKEN')
      Vue.prototype.$message({
        message: 'Token取消绑定',
        type: 'info'
      })
    },
  }
}

export default token
