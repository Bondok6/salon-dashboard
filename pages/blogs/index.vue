<template>
  <section>
    <uiAddButton text="Add Blog" @click="goTo()" />

    <uiEmpty
      v-if="!blogs.length"
      imgSrc="blogs/no-blog.png"
      caption="No blogs have been added yet."
    />

    <blogsBlogList :blogs="blogs" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("blogs/fetchBlogs");
  },
  methods: {
    goTo() {
      this.$router.push("/blogs/add");
    },
  },
  computed: {
    blogs() {
      return this.$store.state.blogs.blogs;
    },
  },
};
</script>

<style></style>
