<template>
  <section>
    <uiAddButton text="Add Service" @click="goTo()" />

    <uiEmpty
      v-if="!services.length"
      imgSrc="services/no-services.png"
      caption="No Services have been added yet."
    />

    <servicesCards :services="services" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("services/fetchServices");
  },
  methods: {
    goTo() {
      this.$router.push("/services-offers/add/step1");
    },
  },
  computed: {
    services() {
      return this.$store.state.services.services;
    },
  },
};
</script>
