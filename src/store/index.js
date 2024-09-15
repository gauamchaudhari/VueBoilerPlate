import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' // Example
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
      localStorage.setItem('isAuthenticated', status); // Persist authentication status
    }
  },
  actions: {
    login({ commit }, credentials) {
      // Simulate a login request
      if (credentials.username === 'admin' && credentials.password === 'password') {
        commit('setAuthenticated', true);
      }
    },
    logout({ commit }) {
      commit('setAuthenticated', false);
    }
  }
});

export default store;
