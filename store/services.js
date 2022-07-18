export const state = () => ({
  services: [],
});

// Mutations
export const mutations = {
  setServices(state, services) {
    state.services = services;
  },
  addService(state, service) {
    state.services.push(service);
  },
  deleteService(state, id) {
    state.services = state.services.filter((s) => s.id !== id);
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
  async addService({ commit }, service) {
    await this.$axios.$post("/services", service);
    commit("addService", service);
  },
  async deleteService({ commit }, id) {
    await this.$axios.$delete(`/services/${id}`);
    commit("deleteService", id);
  },
};
