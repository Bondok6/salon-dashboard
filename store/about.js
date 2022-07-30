export const state = () => ({
  info: [],
  aboutId: null,
});

// Mutations
export const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  setAboutId(state, aboutId) {
    state.aboutId = aboutId;
  },
};

// Actions
export const actions = {
  async fetchAllInfo({ commit }) {
    const data = await this.$axios.$get("/about");
    const { about } = data;
    const { id } = data;
    commit("setInfo", about);
    commit("setAboutId", id);
  },
  async addInfo({ commit }, info) {
    const data = await this.$axios.$post("/about", info);
    const { about } = data;
    const { id } = data;
    commit("setInfo", about);
    commit("setAboutId", id);
  },
};
