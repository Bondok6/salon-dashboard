export const state = () => ({
  users: [],
});

// Mutations
export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  addUser(state, user) {
    state.users.push(user);
  },
  deleteUser(state, id) {
    state.users = state.users.filter((e) => e.id !== id);
  },
  updateUser(state, user) {
    const index = state.users.findIndex((e) => e.id === user.id);
    state.users[index] = user;
  },
};

// Actions
export const actions = {
  async fetchUsers({ commit }) {
    const users = await this.$axios.$get("/users", {
      params: { roles: "ADMIN" },
    });
    commit("setUsers", users);
  },
  async addUser({ commit }, user) {
    const fd = new FormData();
    fd.append("photos", user.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const userObj = { ...user, profile: res[0].url };
    console.log({ userObj });
    const newUser = await this.$axios.$post("/users/add/employees", userObj);
    console.log({ newUser });
    commit("addUser", newUser);
  },
  async deleteUser({ commit }, id) {
    await this.$axios.$delete(`/users/${id}`);
    commit("deleteUser", id);
  },
  async updateUser({ commit }, user) {
    const { id } = user;
    if (user.hasOwnProperty("profile")) {
      const updatedUser = await this.$axios.$put(
        `/users/${id}/admin-control`,
        user
      );
      commit("updateUser", updatedUser);
      return;
    }
    const fd = new FormData();
    fd.append("photos", user.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const newUser = {
      ...user,
      profile: res[0].url,
    };
    const updatedUser = await this.$axios.$put(
      `/users/${id}/admin-control`,
      newUser
    );
    commit("updateUser", updatedUser);
  },
  async fetchUser({ commit }, id) {
    const user = await this.$axios.$get(`/users/${id}`);
    return user;
  },
};
