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
        <statisticsCard />
      </div>
      <div class="col-md-3 statistics-card">
        <statisticsTarget />
      </div>
    </div>
    <div class="row gap-5 m-5">
      <div class="col-md-8 statistics-card">
        <statisticsLinearProgress />
      </div>
      <div class="col-md-3 statistics-card"></div>
    </div>
  </section>
</template>

<script>
import LinearProgress from "../components/statistics/LinearProgress.vue";
export default {
  computed: {
    user() {
      return this.$auth.$storage.getUniversal("user");
    },
    today() {
      return this.$moment().format("MMMM Do YYYY");
    },
  },
  components: { LinearProgress },
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
