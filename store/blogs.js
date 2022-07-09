export const state = () => ({
  blogs: [],
});

// Mutations
export const mutations = {
  setBlogs(state, blogs) {
    state.blogs = blogs;
  },
  addBlog(state, blog) {
    state.blogs.push(blog);
  },
  deleteBlog(state, blogId) {
    state.blogs = state.blogs.filter((b) => b.id !== blogId);
  },
};

// Actions
export const actions = {
  async fetchBlogs({ commit }) {
    const blogs = await this.$axios.$get("/blogs-and-videos?type=BLOG");
    commit("setBlogs", blogs);
  },
  async addBlog({ commit }, blog) {
    const fd = new FormData();
    fd.append("photos", blog.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const newBlog = {
      ...blog,
      images: [res[0].url],
      type: "BLOG",
    };
    await this.$axios.$post("/blogs-and-videos", newBlog);
    commit("addBlog", newBlog);
  },
  async deleteBlog({ commit }, blogId) {
    await this.$axios.$delete(`/blogs-and-videos/${blogId}`);
    commit("deleteBlog", blogId);
  },
};
