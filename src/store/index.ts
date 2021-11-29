import { createStore } from 'vuex';

export default createStore({
  state: {
    checkPop: false,
  },
  mutations: {
    SET_POP(state, flag) {
      state.checkPop = flag;
    },
  },
  actions: {},
  modules: {},
});
