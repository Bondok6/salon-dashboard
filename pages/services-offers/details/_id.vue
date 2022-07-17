<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" class="p-5 w-100">
    <div class="blog-cards__card w-75 border-0">
      <div>
        <img
          :src="service.images[0]"
          alt="service image"
          class="blog-cards__card-image img--detials"
        />
      </div>
      <div class="blog-cards__card-content">
        <h3 class="blog-cards__card-title">{{ service.nameEn }}</h3>
        <p class="blog-cards__card-text">
          <span class="price">${{ service.price.price }}</span>
          <span class="discount">${{ service.price.priceAftereOffer }}</span>
        </p>
      </div>
    </div>

    <div class="mt-5">
      <div class="service-details">
        <div class="key">Duration:</div>
        <div class="value">{{ service.deuration }} Minutes</div>
      </div>
      <div class="service-details">
        <div class="key">Employees:</div>
        <div class="value">{{ service.employees.length }}</div>
      </div>
      <div class="service-details">
        <div class="key">Number Of Sessions:</div>
        <div class="value">{{ service.numofsets }}</div>
      </div>
      <div class="service-details">
        <div class="key">Discription:</div>
        <div class="value">{{ service.descriptionEn }}</div>
      </div>
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
    const data = await this.$store.dispatch("services/fetchService", id);
    this.service = { ...data };
  },
  data() {
    return {
      service: {},
    };
  },
  methods: {
    goTo(id) {
      this.$router.push(`/services/edit/${id}`);
    },
  },
};
</script>
