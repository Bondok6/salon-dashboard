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
        <p class="blog-cards__card-text" v-if="service.price.priceAftereOffer">
          <span class="price">₪ {{ service.price.price }}</span>
          <span class="discount">₪ {{ service.price.priceAftereOffer }}</span>
        </p>
        <p class="blog-cards__card-text" v-else>
          <span class="prince-only">₪ {{ service.price.price }}</span>
        </p>
      </div>

      <div class="blog-cards__card-buttons">
        <el-switch
          :inactive-color="service.enabled ? '#ea3162' : '#ccc'"
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
          @click="deleteService(service)"
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
    goToDetails(id) {
      this.$router.push(`/services-offers/details/${id}`);
    },
    goTo(id) {
      this.$router.push(`/services-offers/edit/step1/${id}`);
    },
    deleteService(service) {
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
            message: "Service deleted successfully",
            type: "success",
          });
          this.$router.push("/services-offers");
        })
        .catch(() => {
          this.$message({
            message: "Service not deleted",
            type: "error",
          });
        });
    },
  },
};
</script>
