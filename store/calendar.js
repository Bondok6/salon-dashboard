export const state = () => ({
  calendar: [],
  employees: [],
});

// Mutations
export const mutations = {
  setCalendar(state, calendar) {
    state.calendar = calendar;
  },
  setEmployees(state, employees) {
    state.employees = employees;
  },
  setServices(state, services) {
    state.services = services;
  },
};

// Actions
export const actions = {
  async fetchCalendar({ commit }) {
    const response = await this.$axios.$get(
      `/reservations/calender/slots?day=2022-07-16T16%3A49%3A39.957%2B00%3A00`
    );
    const filters = response.map((res) => res.filters);
    commit("setCalendar", filters);
    const employees = filters.map((filter) => filter.map((f) => f.empolyee));
    const employeesFlat = employees.flat();
    employeesFlat.forEach((emp, ind) => {
      if (ind > 0 && emp.id === employeesFlat[ind - 1].id) {
        employeesFlat.splice(ind, 1);
      }
    });
    commit("setEmployees", employeesFlat);
  },
};
