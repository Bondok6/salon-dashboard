<template>
  <div class="card-3">
    <h2>Revenue Report</h2>
    <div class="wrapper">
      <div class="chart">
        <div class="chart-bar" v-for="item in linearProgress" :key="item.day">
          <div class="chart-bar__inner">
            <div
              class="chart-bar__fill"
              :style="`height: ${item.count}%;`"
            ></div>
          </div>
          <div class="chart-bar__label">{{ item.day }}</div>
        </div>
      </div>
      <div class="earning">
        <div>
          <h4>Earning</h4>
          <h6>Today</h6>
        </div>
        <h3>${{ todayRevenue }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todayRevenue: {
      type: Number,
      required: true,
    },
    linearProgress: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-3 {
  padding: 2rem;

  .wrapper {
    display: flex;
    width: 100%;
  }

  h2 {
    font-size: 2rem;
    color: #5e5873;
  }

  .chart {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
    text-align: center;
    height: 15rem;
    width: 70%;

    &-bar {
      height: 100%;
      width: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &__inner {
        height: 100%;
        width: 100%;
        border-radius: 12px;
        background-color: #f3f3f3;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      &__fill {
        background-color: #ea3162;
        width: 100%;
        transition: all 0.3s ease-out;
      }

      &__label {
        font-size: 1rem;
        text-align: center;
        color: #b9b9c3;
        padding-top: 0.5rem;
      }
    }
  }

  .earning {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    color: #5e5873;

    h4 {
      font-size: 2rem;
    }

    h6 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 3rem;
      font-weight: bold;
    }
  }
}
</style>
