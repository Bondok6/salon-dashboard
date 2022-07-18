export const state = () => ({
  workingHours: [],
});

// Mutations
export const mutations = {
  setWorkingHours(state, workingHours) {
    state.workingHours = workingHours;
  },
};

// Actions
export const actions = {
  async fetchWorkingHoursPerDay() {
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
};
