<template>
  <ul class="blog-cards">
    <li v-for="service in services" :key="service.id" class="blog-cards__card">
      <div @click="goToDetails(service.id)">
        <img
          :src="service.images[0]"
          alt="service image"
          class="blog-cards__card-image"
        />
      </div>
      <div class="blog-cards__card-content" @click="goToDetails(service.id)">
        <h3 class="blog-cards__card-title">{{ service.nameEn }}</h3>
        <p class="blog-cards__card-text">
          <span class="price">${{ service.price.price }}</span>
          <span class="discount">${{ service.price.priceAftereOffer }}</span>
        </p>
      </div>

      <div class="blog-cards__card-buttons">
        <el-switch
          :inactive-color="service.enabled === true ? '#ea3162' : '#ccc'"
          disabled
        ></el-switch>
        <img
          src="@/assets/images/blogs/edit.png"
          alt="edit-icon"
          @click="goTo(service.id)"
        />
        <img
          src="@/assets/images/blogs/delete.png"
          alt="delete-icon"
          @click="deleteBlog(service)"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteBlog(service) {
      this.$confirm(
        `Are you sure you want to delete '${service.nameEn}' service?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("services/deleteService", service.id);
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
    goToDetails(id) {
      this.$router.push(`/services-offers/details/${id}`);
    },
  },
};
</script>
