import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    loginSuccess(state, id) {
      state.isLoggedIn = true;
      state.id = id;
    },
  },
});

export default store;
