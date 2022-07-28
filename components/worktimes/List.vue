<template>
  <section class="worktimes container">
    <div class="row gap-4 my-5 mx-2" v-for="work in workTimes" :key="work.id">
      <div class="col-md-3 wrapper">
        <div class="key">{{ work.day }}</div>
      </div>
      <div class="col-md-8 wrapper">
        <div
          class="state"
          :class="work.state === 'OPEN' ? 'state--open' : 'state--closed'"
        >
          {{ work.state }}
        </div>
        <div class="times">
          <div class="form">{{ timeFormat(work.startAt) }}</div>
          <div>TO</div>
          <div class="to">{{ timeFormat(work.endAt) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    workTimes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    timeFormat(date) {
      return this.$moment(date).format("hh:mm A");
    },
  },
};
</script>

<style lang="scss" scoped>
.worktimes {
  padding-top: 8rem;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.1rem;

  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
    border-radius: 0.5rem;

    .state {
      &:before {
        content: "";
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        font-size: 1.6rem;
        position: relative;
        top: 0.2rem;
      }

      &--open {
        &:before {
          background-color: #00a65a;
        }
      }

      &--closed {
        &:before {
          background-color: #ff0000;
        }
      }
    }

    .times {
      display: flex;
      gap: 2rem;
    }
  }
}
</style>
