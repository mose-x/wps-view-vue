import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    createFileDone: false,
    editFileDone: false
  },
  mutations: {
    changeCDate(state){
      state.createFileDone = !state.createFileDone
    },
    changeEDate(state){
      state.editFileDone = !state.editFileDone
    }
  },
  actions: {
  },
  modules: {
  }
})
