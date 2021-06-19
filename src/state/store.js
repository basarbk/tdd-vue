import { createStore } from "vuex";
import storage from "./storage";

const store = createStore({
  state() {
    return storage.getItem("auth");
  },
  mutations: {
    loginSuccess(state, data) {
      state.isLoggedIn = true;
      for (let key in data) {
        state[key] = data[key];
      }
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
  storage.setItem("auth", state);
});

export const resetAuthState = () => {
  store.commit("reset", storage.getItem("auth"));
};

export default store;
