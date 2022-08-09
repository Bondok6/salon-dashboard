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
  async fetchCalendar({ commit }, date = new Date()) {
    // formate to localeString
    // const formattedDate = date.toLocaleString();
    // console.log(formattedDate);
    const day = "2022-08-08T22:00:00.000Z";
    const response = await this.$axios.$get(`/reservations/calender/slots`, {
      params: {
        day: day,
      },
    });
    const filters = response.map((res) => res.filters);
    console.log(filters);

    commit("setCalendar", filters);
    const employees = filters.map((filter) => filter[0].empolyee);
    console.log(employees);

    commit("setEmployees", employees);
  },
};
