<template>
  <ul class="blog-cards">
    <li v-for="blog in blogs" :key="blog.id" class="blog-cards__card">
      <div>
        <img
          :src="blog.images[0]"
          alt="blog image"
          class="blog-cards__card-image"
        />
      </div>
      <div class="blog-cards__card-content">
        <h3 class="blog-cards__card-title">{{ blog.titleEn }}</h3>
        <p class="blog-cards__card-text">{{ blog.briefEn }}</p>
      </div>
      <div class="blog-cards__card-buttons">
        <img
          src="@/assets/images/blogs/edit.png"
          alt="edit-icon"
          role="button"
        />
        <img
          src="@/assets/images/blogs/delete.png"
          alt="delete-icon"
          role="button"
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
};
</script>
