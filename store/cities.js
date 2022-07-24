export const state = () => ({
  cities: [],
});

// Mutations
export const mutations = {
  setCities(state, cities) {
    state.cities = cities;
  },
};

// Actions
export const actions = {
  async fetchCities({ commit }) {
    const cities = await this.$axios.$get("/cities");
    commit("setCities", cities);
  },
};
