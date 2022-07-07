export const state = () => ({
  ads: [],
});

// Mutations
export const mutations = {
  setAds(state, ads) {
    state.ads = ads;
  },
  addAd(state, ad) {
    state.ads.push(ad);
  },
  updateAd(state, ad) {
    const index = state.ads.findIndex((a) => a.id === ad.id);
    state.ads[index] = ad;
  },
  deleteAd(state, id) {
    const index = state.ads.findIndex((a) => a.id === id);
    state.ads.splice(index, 1);
  },
};

// Actions
export const actions = {
  async fetchAds({ commit }) {
    const ads = await this.$axios.$get("/ads");
    commit("setAds", ads);
  },
  async addAd({ commit }, ad) {
    const fd = new FormData();
    fd.append("photos", ad.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const newAd = {
      descriptionEn: ad.descriptionEn,
      descriptionAr: ad.descriptionAr,
      descriptionHeb: ad.descriptionHeb,
      photo: res[0].url,
    };
    await this.$axios.$post("/ads", newAd);
    commit("addAd", newAd);
  },
  async updateAd({ commit }, ad) {
    const updatedAd = await this.$axios.$patch(`/ads/${ad.id}`, ad);
    commit("updateAd", updatedAd);
  },
  async deleteAd({ commit }, id) {
    await this.$axios.$delete(`/ads/${id}`);
    commit("deleteAd", id);
  },
  async fetchAd({ commit }, id) {
    const ad = await this.$axios.$get(`/ads/${id}`);
    return ad;
  },
};
