<template>
  <section>
    <uiAddButton text="Information" @click="goTo()" />

    <uiEmpty
      v-if="!info.length"
      imgSrc="about/no-info.png"
      caption="No inforamtion have been added yet."
    />

    <aboutList :info="info" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("about/fetchAllInfo");
  },
  methods: {
    goTo() {
      this.$router.push("/about/add");
    },
  },
  computed: {
    info() {
      return this.$store.state.about.info;
    },
  },
};
</script>
