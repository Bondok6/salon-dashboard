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
        <button class="delete" @click="deleteAd(ad.id)">
          <img src="@/assets/images/ads/delete.png" alt="delete-icon" />
        </button>
        <button class="edit" @click="goTo(ad.id)">
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
  methods: {
    deleteAd(id) {
      this.$confirm("Are you sure you want to delete this ad?", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("ads/deleteAd", id);
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
      this.$router.push(`/ads/edit/${id}`);
    },
  },
};
</script>
