<template>
  <ul class="about">
    <li v-for="info in info" :key="info._id" class="about__info">
      <div class="data">
        <div>
          <h4>Title</h4>
          <p>{{ info.titleEn }}</p>
        </div>
        <div>
          <h4>Description</h4>
          <p class="description">{{ info.contentEn }}</p>
        </div>
      </div>

      <div class="options">
        <img
          src="@/assets/images/blogs/edit.png"
          alt="edit-icon"
          @click="goTo(info._id)"
          class="px-2"
          role="button"
        />
        <img
          src="@/assets/images/blogs/delete.png"
          alt="delete-icon"
          @click="deleteInfo(info)"
          class="pe-4"
          role="button"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteInfo(info) {
      this.$confirm(
        `Are you sure you want to delete '${info.titleEn}'?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("about/deleteInfo", info._id);
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
      this.$router.push(`/about/edit/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.about__info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  .data {
    width: 90%;
    h4 {
      font-size: 1.4rem;
      font-weight: bold;
      margin: 1rem 0;
    }

    p {
      font-size: 1.6rem;
      padding-left: 1rem;
      text-align: justify;
    }
  }
}
</style>
