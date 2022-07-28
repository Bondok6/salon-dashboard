export const state = () => ({
  workTimes: [],
});

// Mutations
export const mutations = {
  setWorkTimes(state, workTimes) {
    state.workTimes = workTimes;
  },
  updateWorkTimes(state, workTime) {
    const index = state.workTimes.findIndex((item) => item.id === workTime.id);
    state.workTimes[index] = workTime;
  },
};

// Actions
export const actions = {
  async fetchWorkingHoursCurrentDay() {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const d = new Date();
    const day = days[d.getDay()];
    const workingHours = await this.$axios.$get(`/working-hour?day=${day}`);
    const startTime = workingHours[0].startAt;
    const endTime = workingHours[0].endAt;
    return [startTime, endTime];
  },
  async fetchWorkingHoursSpecificDay({ commit }, date) {
    // convert date to day of week
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    const d = new Date(date);
    const day = days[d.getDay()];
    const workingHours = await this.$axios.$get(`/working-hour?day=${day}`);
    const startTime = workingHours[0].startAt;
    const endTime = workingHours[0].endAt;
    return [startTime, endTime];
  },
  async fetchWorkTimes({ commit }) {
    const workTimes = await this.$axios.$get("/working-hour");
    commit("setWorkTimes", workTimes);
  },
  async getWorkTimes() {
    const workTimes = await this.$axios.$get("/working-hour");
    return workTimes;
  },
  async updateWorkTimes({ commit }, workTimes) {
    workTimes.forEach(async (workTime) => {
      await this.$axios.$patch(`/working-hour/${workTime.id}`, workTime);
      commit("updateWorkTimes", workTime);
    });
  },
};
