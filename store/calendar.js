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
};

// Actions
export const actions = {
  async fetchCalendar({ commit }, date = new Date()) {
    // formate to localeString
    // const formattedDate = date.toLocaleString();

    const day = "2022-08-08T22:00:00.000Z";
    const response = await this.$axios.$get(`/reservations/calender/slots`, {
      params: {
        day: day,
      },
    });
    const filters = response.map((res) => res.filters);
    commit("setCalendar", filters);
    console.log(filters);
    const employees = filters.map((filter) => filter[0].empolyee);
    commit("setEmployees", employees);
  },
};
