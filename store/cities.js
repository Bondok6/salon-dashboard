export const state = () => ({
  cities: [],
});

// Mutations
export const mutations = {
  setCities(state, cities) {
    state.cities = cities;
  },
  addCity(state, city) {
    state.cities.push(city);
  },
  deleteCity(state, cityId) {
    state.cities = state.cities.filter((c) => c.id !== cityId);
  },
  updateCity(state, city) {
    const index = state.cities.findIndex((c) => c.id === city.id);
    state.cities[index] = city;
  },
};

// Actions
export const actions = {
  async fetchCities({ commit }) {
    const cities = await this.$axios.$get("/cities");
    commit("setCities", cities);
  },
  async addCity({ commit }, city) {
    const newCity = await this.$axios.$post("/cities", city);
    commit("addCity", newCity);
  },
  async deleteCity({ commit }, cityId) {
    await this.$axios.$delete(`/cities/${cityId}`);
    commit("deleteCity", cityId);
  },
  async updateCity({ commit }, city) {
    const { id } = city;
    const updateCity = await this.$axios.$patch(`/cities/${id}`, city);
    commit("updateCity", updateCity);
  },
  async fetchCity(_, cityId) {
    const city = await this.$axios.$get(`/cities/${cityId}`);
    return city;
  },
};
