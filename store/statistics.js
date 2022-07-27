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
  setCount(state, count) {
    state.count = count;
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
    const res = await this.$axios.get("/statistics/count/users?role=Client");
    const customers = res.data.count;

    const res1 = await this.$axios.get(
      "/statistics/count/users?role=Employee?attendent=ABSENT"
    );
    const absentEmployees = res1.data.count;

    const res2 = await this.$axios.get("/statistics/reservations/count-docs");
    const reservations = res2.data.count;

    const res3 = await this.$axios.get("/statistics/revenue/calculate-revenue");
    const revenue = res3.data[0].totalReven;

    const count = {
      reservations,
      customers,
      absentEmployees,
      revenue,
    };

    commit("setCount", count);
  },
  async getTodayRevenue({ commit }) {
    const date = new Date();
    const today = date.toISOString();
    const res = await this.$axios.get(
      `/statistics/revenue/calculate-revenue?day=${today}`
    );
    const revenue = res.data[0].totalReven;

    commit("setTodayRevenue", revenue);
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
