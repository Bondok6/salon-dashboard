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
        <div class="times" v-if="work.state === 'OPEN'">
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
