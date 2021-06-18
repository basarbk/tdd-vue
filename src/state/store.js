import { createStore } from "vuex";

const store = createStore({
  state() {
    return JSON.parse(localStorage.getItem("auth"));
  },
  mutations: {
    loginSuccess(state, id) {
      state.isLoggedIn = true;
      state.id = id;
    },
    reset(state, initialState) {
      state.isLoggedIn = false;
      delete state.id;
      for (let key in initialState) {
        state[key] = initialState[key];
      }
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("auth", JSON.stringify(state));
});

export const resetAuthState = () => {
  store.commit("reset", JSON.parse(localStorage.getItem("auth")));
};

export default store;
