export const state = () => ({
  info: [],
});

// Mutations
export const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  addInfo(state, info) {
    state.info.push(info);
  },
  deleteInfo(state, infoId) {
    state.info = state.info.filter((i) => i.id !== infoId);
  },
  updateInfo(state, info) {
    const index = state.info.findIndex((i) => i.id === info.id);
    state.info[index] = info;
  },
};

// Actions
export const actions = {
  async fetchAllInfo({ commit }) {
    const data = await this.$axios.$get("/about");
    const info = data.about;
    commit("setInfo", info);
  },
  async addInfo({ commit }, info) {
    const newInfo = await this.$axios.$post("/about", info);
    commit("addInfo", newInfo);
  },
  async deleteInfo({ commit }, infoId) {
    await this.$axios.$delete(`/about/${infoId}`);
    commit("deleteInfo", infoId);
  },
  async updateInfo({ commit }, info) {
    const { id } = info;
    const updateInfo = await this.$axios.$patch(`/about/${id}`, info);
    commit("updateInfo", updateInfo);
  },
  async fetchInfo(_, infoId) {
    const info = await this.$axios.$get(`/about/${infoId}`);
    return info;
  },
};
