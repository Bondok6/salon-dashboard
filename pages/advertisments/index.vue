<template>
  <section>
    <uiAddButton text="Advertisment" @click="goTo" />

    <uiEmpty
      v-if="!ads.length"
      imgSrc="ads/no-ads.png"
      caption="No advertisements have been added yet"
    />

    <adsAdvertismentList :ads="ads" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("ads/fetchAds");
  },
  methods: {
    goTo() {
      this.$router.push("/advertisments/add");
    },
  },
  computed: {
    ads() {
      return this.$store.state.ads.ads;
    },
  },
};
</script>
