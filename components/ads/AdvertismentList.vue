<template>
  <ul class="ad-card">
    <li v-for="ad in ads" :key="ad.id">
      <figure>
        <img :src="ad.photo[0]" alt="ad-image" class="ad-card__img" />
        <figcaption class="ad-card__description">
          {{ ad.descriptionEn }}
        </figcaption>
      </figure>
      <div class="ad-card__options">
        <button class="delete">
          <img src="@/assets/images/ads/delete.png" alt="delete-icon" />
        </button>
        <button class="edit">
          <img src="@/assets/images/ads/edit.png" alt="edit-icon" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    ads: {
      type: Array,
      required: true,
    },
  },
};
</script>
