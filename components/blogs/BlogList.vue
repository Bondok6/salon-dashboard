<template>
  <ul class="blog-cards">
    <li v-for="blog in blogs" :key="blog.id" class="blog-cards__card">
      <div @click="goToDetails(blog.id)">
        <img
          :src="blog.images[0]"
          alt="blog image"
          class="blog-cards__card-image"
        />
      </div>
      <div class="blog-cards__card-content" @click="goToDetails(blog.id)">
        <h3 class="blog-cards__card-title">{{ blog.titleEn }}</h3>
        <p class="blog-cards__card-text">{{ blog.briefEn }}</p>
      </div>

      <div class="blog-cards__card-buttons">
        <img
          src="@/assets/images/blogs/edit.png"
          alt="edit-icon"
          @click="goTo(blog.id)"
        />
        <img
          src="@/assets/images/blogs/delete.png"
          alt="delete-icon"
          @click="deleteBlog(blog)"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteBlog(blog) {
      this.$confirm(
        `Are you sure you want to delete '${blog.titleEn}' blog?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("blogs/deleteBlog", blog.id);
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
      this.$router.push(`/blogs/edit/${id}`);
    },
    goToDetails(id) {
      this.$router.push(`/blogs/details/${id}`);
    },
  },
};
</script>
