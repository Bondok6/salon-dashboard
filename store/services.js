export const state = () => ({
  services: [],
});

// Mutations
export const mutations = {
  setServices(state, services) {
    state.services = services;
  },
};

// Actions
export const actions = {
  async fetchServices({ commit }) {
    const services = await this.$axios.$get("/services");
    commit("setServices", services);
  },
  async fetchEnabledServices({ commit }) {
    const services = await this.$axios.$get("/services?enabled=true");
    commit("setServices", services);
  },
  async fetchDisabledServices({ commit }) {
    const services = await this.$axios.$get("/services?enabled=false");
    commit("setServices", services);
  },
  async fetchService({ commit }, id) {
    const service = await this.$axios.$get(`/services/${id}`);
    return service;
  },
};
