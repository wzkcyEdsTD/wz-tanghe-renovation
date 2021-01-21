// 定义修改操作
import * as types from './mutation-types'

const mutations = {
  [types.SET_USERNAME](state, data) {
    state.username = data
  },
  [types.SET_NAME](state, data) {
    state.name = data
  }
}
export default mutations
