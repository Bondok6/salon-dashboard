export const state = () => ({
  blogs: [],
});

// Mutations
export const mutations = {
  setBlogs(state, blogs) {
    state.blogs = blogs;
  },
};

// Actions
export const actions = {
  async fetchBlogs({ commit }) {
    const blogs = await this.$axios.$get("/blogs-and-videos?type=BLOG");
    commit("setBlogs", blogs);
  },
};
