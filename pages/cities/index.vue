<template>
  <section>
    <uiAddButton text="Add City" @click="goTo()" />

    <uiEmpty
      v-if="!cities.length"
      imgSrc="cities/no-cities.png"
      caption="No cities have been added yet."
    />

    <citiesList :cities="cities" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("cities/fetchCities");
  },
  methods: {
    goTo() {
      this.$router.push("/cities/add");
    },
  },
  computed: {
    cities() {
      return this.$store.state.cities.cities;
    },
  },
};
</script>
