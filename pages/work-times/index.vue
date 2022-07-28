<template>
  <section>
    <uiAddButton text="Edit Times" @click="goTo()" />

    <uiEmpty
      v-if="!workTimes.length"
      imgSrc="work/no-times.png"
      caption="No work times have been added yet"
    />

    <worktimesList :workTimes="workTimes" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("workTimes/fetchWorkTimes");
  },
  methods: {
    goTo() {
      this.$router.push("/work-times/add");
    },
  },
  computed: {
    workTimes() {
      return this.$store.state.workTimes.workTimes;
    },
  },
};
</script>
