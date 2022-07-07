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
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      photo: res[0].url,
    };
    await this.$axios.$post("/employees", newEmployee);
    commit("addEmployee", newEmployee);
  },
};
