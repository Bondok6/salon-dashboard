<template>
  <figure class="empty">
    <img :src="require(`@/assets/images/${imgSrc}`)" alt="empty-icon" />
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
};
</script>
