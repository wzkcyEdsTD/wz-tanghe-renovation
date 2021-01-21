import * as types from './mutation-types'

export const setUsername = function({ commit }, data) {
  commit(types.SET_USERNAME, data)
}

export const setName = function({ commit }, data) {
  commit(types.SET_NAME, data)
}
