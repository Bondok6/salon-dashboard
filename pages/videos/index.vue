<template>
  <section>
    <uiAddButton text="Add Video" @click="goTo()" />

    <uiEmpty
      v-if="!videos.length"
      imgSrc="videos/no-videos.png"
      caption="No videos have been added yet."
    />

    <videosList :videos="videos" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("videos/fetchVideos");
  },
  methods: {
    goTo() {
      this.$router.push("/videos/add");
    },
  },
  computed: {
    videos() {
      return this.$store.state.videos.videos;
    },
  },
};
</script>

<style></style>
