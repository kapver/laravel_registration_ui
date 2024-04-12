import Vue from 'vue'
import Vuex from 'vuex'
import api from '../plugins/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: [],
    errors: [],
    loading: false,
    countries: []
  },
  actions: {
    async load_countries({ commit }, car_maker_id) {
      await api.get('countries').then(response => {
        commit('set_countries', response?.data.countries)
      });
    },

    async register({ commit }, data) {
      await api.post('auth/register', data).then(response => {
          commit('set_notifications', response)
      });
    },

    set_errors({commit}, response) {
      commit('set_errors', response);
    },

    set_notifications({commit}, response) {
      commit('set_notifications', response);
    },

    reset_flash({commit}) {
      commit('reset_flash')
    },
  },

  mutations: {
    set_notifications: (state, response) => {
      const notifications = response.data.message ?? response.data.errors;
      state.notifications = (typeof notifications == 'string') ? [notifications] : (notifications ?? []);
    },

    set_errors: (state, errors) => {
      errors = errors.response.data.message ?? errors.response.data.errors;
      state.errors = (typeof errors == 'string') ? [errors] : (errors ?? []);
    },

    set_loading: (state, loading) => state.loading = loading,
    set_countries: (state, items) => state.countries = items,

    reset_flash(state) {
      state.notifications = [];
      state.errors = [];
    },
  },

  getters: {
    notifications: state => state.notifications,
    errors: state => state.errors,
    loading: state => state.loading,
    countries: (state) => state.countries ?? [],
  },
})