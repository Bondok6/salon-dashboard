<template>
  <ul class="blog-cards">
    <li v-for="video in videos" :key="video.id" class="blog-cards__card">
      <div @click="goToDetails(video.id)">
        <img
          src="@/assets/images/videos/watch-icon.png"
          alt="video icon"
          class="blog-cards__card-image"
        />
      </div>
      <div class="blog-cards__card-content" @click="goToDetails(video.id)">
        <h3 class="blog-cards__card-title">{{ video.titleEn }}</h3>
        <p class="blog-cards__card-text">
          {{ video.briefEn.split(" ").slice(0, 30).join(" ") + "..." }}
        </p>
      </div>

      <div class="blog-cards__card-buttons">
        <img
          src="@/assets/images/blogs/edit.png"
          alt="edit-icon"
          @click="goTo(video.id)"
        />
        <img
          src="@/assets/images/blogs/delete.png"
          alt="delete-icon"
          @click="deleteVideo(video)"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    videos: {
      type: Array,
      required: true,
    },
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
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
          });
        });
    },
    goTo(id) {
      this.$router.push(`/videos/edit/${id}`);
    },
    goToDetails(id) {
      this.$router.push(`/videos/details/${id}`);
    },
  },
};
</script>

<style></style>
