<template>
  <section class="statistics">
    <div class="d-flex justify-content-between align-items-center px-5">
      <h1>Dashboard</h1>
      <div class="fs-4">
        {{ today }}
        <img
          src="@/assets/images/statistics/date.png"
          alt="date"
          role="button"
        />
      </div>
    </div>

    <div class="row gap-5 m-5">
      <div class="col-md-8 statistics-card">
        <statisticsCard :counts="counts" />
      </div>
      <div class="col-md-3 statistics-card">
        <statisticsTarget :mostUsedService="mostUsedService" />
      </div>
    </div>
    <div class="row gap-5 m-5">
      <div class="col-md-8 statistics-card">
        <statisticsLinearProgress
          :todayRevenue="todayRevenue"
          :linearProgress="linearProgress"
        />
      </div>
      <div class="col-md-3 statistics-card">
        <statisticsCircleProgress :circleProgress="circleProgress" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("statistics/getCounts");
    await store.dispatch("statistics/getTodayRevenue");
    await store.dispatch("statistics/getMostUsedService");
    await store.dispatch("statistics/getLinearProgress");
    await store.dispatch("statistics/getCircleProgress");
  },
  computed: {
    user() {
      return this.$auth.$storage.getUniversal("user");
    },
    today() {
      return this.$moment().format("MMMM Do YYYY");
    },
    counts() {
      return this.$store.state.statistics.counts;
    },
    todayRevenue() {
      return this.$store.state.statistics.todayRevenue;
    },
    mostUsedService() {
      return this.$store.state.statistics.mostUsedService;
    },
    linearProgress() {
      return this.$store.state.statistics.linearProgress;
    },
    circleProgress() {
      return this.$store.state.statistics.circleProgress;
    },
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  width: 100%;

  &-card {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #f5f5f5;
    padding: 1rem;
  }
}
</style>
