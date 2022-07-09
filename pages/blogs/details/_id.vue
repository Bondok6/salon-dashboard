<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" class="p-5 w-100">
    <div class="blog-cards__card w-75">
      <div>
        <img
          :src="blog.images[0]"
          alt="blog image"
          class="blog-cards__card-image img--detials"
        />
      </div>
      <div class="blog-cards__card-content">
        <h3 class="blog-cards__card-title">{{ blog.titleEn }}</h3>
        <p class="blog-cards__card-text text--details">{{ blog.briefEn }}</p>
      </div>
    </div>

    <div class="mt-5">
      <h3 class="fs-1 p-3 fw-bold">Content Of Blog</h3>
      <p class="fs-3 p-3 lh-lg">
        {{ blog.contentEn }}
      </p>
    </div>

    <div class="buttons--details">
      <img
        src="@/assets/images/blogs/edit-bg.png"
        alt="edit-icon"
        @click="goTo(blog.id)"
      />
      <img
        src="@/assets/images/blogs/delete-bg.png"
        alt="delete-icon"
        @click="deleteBlog(blog)"
      />
    </div>
  </section>
</template>

<script>
export default {
  async fetch() {
    const { id } = this.$route.params;
    const data = await this.$store.dispatch("blogs/fetchBlog", id);
    this.blog = { ...data };
  },
  data() {
    return {
      blog: {},
    };
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
          this.$router.push("/blogs");
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
  },
};
</script>

<style></style>
