<template>
  <ul class="cards-cities">
    <li v-for="city in cities" :key="city.id" class="card-city">
      <h4>{{ city.nameEn }}</h4>
      <div class="blog-cards__card-buttons">
        <img
          src="@/assets/images/blogs/edit.png"
          alt="edit-icon"
          @click="goTo(city.id)"
        />
        <img
          src="@/assets/images/blogs/delete.png"
          alt="delete-icon"
          @click="deleteCity(city)"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteCity(city) {
      this.$confirm(
        `Are you sure you want to delete '${city.nameEn}' city?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("cities/deleteCity", city.id);
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
    goTo(id) {
      this.$router.push(`/cities/edit/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.cards-cities {
  padding-top: 2rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;

  .card-city {
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    box-shadow: inset 0 0 0 1px #d8d6de;
    border-radius: 1rem;
  }
}
</style>
