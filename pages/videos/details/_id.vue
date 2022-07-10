<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" class="p-5 w-100">
    <div class="w-50">
      <a :href="video.link" target="_blank">
        <img src="@/assets/images/videos/watch-icon.png" width="300" />
      </a>
    </div>

    <div class="mt-5">
      <h3 class="fs-1 p-3 fw-bold">{{ video.titleEn }}</h3>
      <p class="fs-3 p-3 lh-lg">
        {{ video.briefEn }}
      </p>
    </div>

    <div class="buttons--details">
      <img
        src="@/assets/images/blogs/edit-bg.png"
        alt="edit-icon"
        @click="goTo(video.id)"
      />
      <img
        src="@/assets/images/blogs/delete-bg.png"
        alt="delete-icon"
        @click="deleteVideo(video)"
      />
    </div>
  </section>
</template>

<script>
export default {
  async fetch() {
    const { id } = this.$route.params;
    const data = await this.$store.dispatch("videos/fetchVideo", id);
    this.video = data;
  },
  data() {
    return {
      video: {},
    };
  },
  methods: {
    deleteVideo(video) {
      this.$confirm(
        `Are you sure you want to delete '${video.titleEn}' video?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("videos/deleteVideo", video.id);
          this.$router.push("/videos");
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    goTo(id) {
      this.$router.push(`/videos/edit/${id}`);
    },
  },
};
</script>

<style></style>
