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
  updateBlog(state, blog) {
    const index = state.blogs.findIndex((b) => b.id === blog.id);
    state.blogs[index] = blog;
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
  async fetchBlog({ commit }, blogId) {
    const blog = await this.$axios.$get(`/blogs-and-videos/${blogId}`);
    return blog;
  },
  async updateBlog({ commit }, blog) {
    console.log(blog);
    const { id } = blog;
    if (blog.hasOwnProperty("images")) {
      const updateBlog = await this.$axios.$patch(
        `/blogs-and-videos/${id}`,
        blog
      );
      commit("updateBlog", updateBlog);
      return;
    }
    const fd = new FormData();
    fd.append("photos", blog.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const newBlog = {
      ...blog,
      images: res[0].url,
    };
    const updateBlog = await this.$axios.$patch(
      `/blogs-and-videos/${id}`,
      newBlog
    );
    commit("updateBlog", updateBlog);
  },
};
