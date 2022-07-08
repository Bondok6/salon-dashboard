export const state = () => ({
  employees: [],
});

// Mutations
export const mutations = {
  setEmployees(state, employees) {
    state.employees = employees;
  },
  addEmployee(state, employee) {
    state.employees.push(employee);
  },
  deleteEmployee(state, id) {
    state.employees = state.employees.filter((e) => e.id !== id);
  },
  updateEmployee(state, employee) {
    const index = state.employees.findIndex((e) => e.id === employee.id);
    state.employees[index] = employee;
  },
};

// Actions
export const actions = {
  async fetchEmployees({ commit }) {
    const employees = await this.$axios.$get("/users", {
      params: { roles: "EMPLOYEE" },
    });

    commit("setEmployees", employees);
  },
  async addEmployee({ commit }, employee) {
    const fd = new FormData();
    fd.append("photos", employee.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const newEmployee = {
      userName: employee.userName,
      profile: res[0].url,
      phone: employee.phone,
      attendent: employee.attendent,
    };
    await this.$axios.$post("/users/add/employees", newEmployee);
    commit("addEmployee", newEmployee);
  },
  async deleteEmployee({ commit }, id) {
    await this.$axios.$delete(`/users/${id}`);
    commit("deleteEmployee", id);
  },
  async updateEmployee({ commit }, employee) {
    const { id } = employee;
    if (employee.hasOwnProperty("profile")) {
      const updatedEmployee = await this.$axios.$put(
        `/users/${id}/admin-control`,
        employee
      );
      commit("updateEmployee", updatedEmployee);
      return;
    }
    const fd = new FormData();
    fd.append("photos", employee.image[0]);
    const res = await this.$axios.$post("/photos", fd);
    const newEmployee = {
      ...employee,
      profile: res[0].url,
    };
    const updatedEmployee = await this.$axios.$put(
      `/users/${id}/admin-control`,
      newEmployee
    );
    commit("updateEmployee", updatedEmployee);
  },
  async fetchEmployee({ commit }, id) {
    const employee = await this.$axios.$get(`/users/${id}`);
    return employee;
  },
};
