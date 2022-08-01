export const state = () => ({
  calendar: [],
  employees: [],
  services: [],
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
    commit("setCalendar", response);
    // extract employees & services from calendar
    const filters = response.map((res) => res.filters);
    const employees = filters.map((filter) => filter.map((f) => f.empolyee));
    /*
      employees = [
        0: [{ id: 1, name: "John" }, { id: 2, name: "Jane" }],
        1: [{ id: 3, name: "Jack" }, { id: 4, name: "Jill" }],
      ]
    */
    const employeesFlat = employees.flat();
    // remove duplicates
    employeesFlat.forEach((emp, ind) => {
      // if the id is identical to the previous one, remove it
      if (ind > 0 && emp.id === employeesFlat[ind - 1].id) {
        employeesFlat.splice(ind, 1);
      }
    });
    console.log(employeesFlat);
    commit("setEmployees", employeesFlat);
    const services = filters.map((filter) => filter.map((f) => f.service));
    commit("setServices", services);
  },
};
