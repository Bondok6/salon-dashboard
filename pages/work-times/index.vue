<template>
  <section>
    <uiAddButton
      text="Edit Times"
      @click="goToEdit()"
      v-if="workTimes.length"
    />
    <uiAddButton text="Add Times" @click="goToAdd()" v-if="!workTimes.length" />

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
    goToEdit() {
      this.$router.push("/work-times/edit");
    },
    goToAdd() {
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
