export const state = () => ({
  videos: [],
});

// Mutations
export const mutations = {
  setVideos(state, videos) {
    state.videos = videos;
  },
  addVideo(state, video) {
    state.videos.push(video);
  },
  deleteVideo(state, videoId) {
    state.videos = state.videos.filter((v) => v.id !== videoId);
  },
  updateVideo(state, video) {
    const index = state.videos.findIndex((v) => v.id === video.id);
    state.videos[index] = video;
  },
};

// Actions
export const actions = {
  async fetchVideos({ commit }) {
    const videos = await this.$axios.$get("/blogs-and-videos?type=VIDEO");
    commit("setVideos", videos);
  },
  async addVideo({ commit }, video) {
    video.type = "VIDEO";
    await this.$axios.$post("/blogs-and-videos", video);
    commit("addVideo", video);
  },
  async deleteVideo({ commit }, videoId) {
    await this.$axios.$delete(`/blogs-and-videos/${videoId}`);
    commit("deleteVideo", videoId);
  },
  async updateVideo({ commit }, video) {
    const updateVideo = await this.$axios.$patch(
      `/blogs-and-videos/${video.id}`,
      video
    );
    commit("updateVideo", updateVideo);
  },
  async fetchVideo(_, videoId) {
    const video = await this.$axios.$get(`/blogs-and-videos/${videoId}`);
    return video;
  },
};
