export const state = () => ({
  counts: {
    reservations: 0,
    customers: 0,
    absentEmployees: 0,
    revenue: 0,
  },
  todayRevenue: 0,
  mostUsedService: {},
  mostUsedServiceToday: {},
});

// mutations
export const mutations = {
  setCounts(state, count) {
    state.counts = count;
  },
  setTodayRevenue(state, revenue) {
    state.todayRevenue = revenue;
  },
  setMostUsedService(state, service) {
    state.mostUsedService = service;
  },
  setMostUsedServiceToday(state, service) {
    state.mostUsedServiceToday = service;
  },
};

// Actions
export const actions = {
  async getCounts({ commit }) {
    const res = await this.$axios.get("/statistics/count/users?role=CLIENT");
    const customers = res.data.count;

    const res1 = await this.$axios.get(
      "/statistics/count/users?role=EMPLOYEE&attendent=ABSENT"
    );
    const absentEmployees = res1.data.count;

    const res2 = await this.$axios.get("/statistics/reservation/count-docs");
    const reservations = res2.data.count;

    const res3 = await this.$axios.get(
      "/statistics/reservation/calculate-revenue"
    );
    const revenue = res3.data[0].totalReven;

    const count = {
      reservations,
      customers,
      absentEmployees,
      revenue,
    };

    commit("setCounts", count);
  },
  async getTodayRevenue({ commit }) {
    const day = new Date();
    const today = day.toISOString();
    const res = await this.$axios.get(
      "/statistics/reservation/calculate-revenue",
      {
        params: {
          day: today,
        },
      }
    );
    if (res.data.length > 0) {
      const revenue = res.data[0].totalReven;
      commit("setTodayRevenue", revenue);
    } else {
      commit("setTodayRevenue", 0);
    }
  },
  async getMostUsedService({ commit }) {
    const res = await this.$axios.get("/statistics/most/used-service");
    const service = res.data[0];

    commit("setMostUsedService", service);
  },
  async getMostUsedServiceToday({ commit }) {
    const date = new Date();
    const today = date.toISOString();
    const res = await this.$axios.get(
      `/statistics/most/used-service?day=${today}`
    );
    const service = res.data[0];

    commit("setMostUsedServiceToday", service);
  },
};
