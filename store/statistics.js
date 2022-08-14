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
  linearProgress: {},
  circleProgress: {},
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
  setLinearProgress(state, progress) {
    state.linearProgress = progress;
  },
  setCircleProgress(state, progress) {
    state.circleProgress = progress;
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
  async getLinearProgress({ commit }) {
    const res = await this.$axios.get("/statistics/reservation-progress");
    const data = res.data.counter;
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const progress = [];

    console.log(data);

    // If data == [], then there is no data for the last 7 days
    if (data.length === 0) {
      for (let i = 0; i < 7; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dayName = weekDays[day.getDay()];
        progress.push({
          day: dayName,
          count: 0,
        });
      }
      commit("setLinearProgress", progress);
      return;
    }

    // function to convert 2022-12-31 to "Tue"
    const convertDay = (day) => {
      const date = new Date(day);
      const dayName = weekDays[date.getDay()];
      return dayName;
    };

    // If data != [], then I should get the day from the date and the count from the data
    // I should push the data to the progress array
    if (data.length > 0) {
      data.forEach((el) => {
        progress.push({
          day: convertDay(el._id),
          count: el.total,
        });
      });

      // If there is a day in weekDays that is not in the progress array, then I should push it with 0 count
      for (let i = 0; i < 7; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dayName = weekDays[day.getDay()];
        if (!progress.find((el) => el.day === dayName)) {
          progress.push({
            day: dayName,
            count: 0,
          });
        }
      }

      // convert count to percentage
      const maxCount = Math.max(...progress.map((el) => el.count));
      progress.forEach((el) => {
        el.count = Math.round((el.count / maxCount) * 100);
      });

      console.log(progress);
      commit("setLinearProgress", progress);
      return;
    }
  },
  async getCircleProgress({ commit }) {
    const res = await this.$axios.get("/statistics/reservation/grouped-status");
    const data = res.data;
    // Remove PROCESSING from the data
    const filteredData = data.filter((el) => el._id !== "PROCESSING");
    // order objects by count ASC
    const orderedData = filteredData.sort((a, b) => a.count - b.count);

    const progress = {
      series: [],
      labels: [],
    };
    progress.labels = orderedData.map((el) => el._id);
    // progress.series = orderedData.map((el) => el.count);

    // convert count to percentage
    orderedData.forEach((el) => {
      // get max count from progress array
      const max = orderedData.reduce((acc, cur) => Math.max(acc, cur.count), 0);
      el.count = Math.round((el.count / max) * 100);
      progress.series.push(el.count);
    });

    commit("setCircleProgress", progress);
  },
};
