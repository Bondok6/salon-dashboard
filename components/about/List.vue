<template>
  <ul class="about">
    <li v-for="info in info" :key="info._id" class="about__info">
      <div class="about__info-left">
        <div>
          <h4>Title</h4>
          <p>{{ info.titleEn }}</p>
        </div>
        <div>
          <h4>Description</h4>
          <p class="description">{{ info.contentEn }}</p>
        </div>
      </div>
      <div class="about__info-right">
        <div class="blog-cards__card-buttons">
          <img
            src="@/assets/images/blogs/edit.png"
            alt="edit-icon"
            @click="goTo(city.id)"
            class="px-2"
          />
          <img
            src="@/assets/images/blogs/delete.png"
            alt="delete-icon"
            @click="deleteCity(city)"
            class="px-3"
          />
        </div>
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
};
</script>

<style lang="scss" scoped>
.about__info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-size: 1.6rem;
    padding-left: 1rem;
  }
}
</style>
