import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user'
import * as editor from './modules/editor'

Vue.use(Vuex)

const state = {}

const actions = {}

const mutations = {}

const getters = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user,
    editor,
  },
})
