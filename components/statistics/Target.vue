<template>
  <div class="card-2">
    <h2>Today</h2>
    <div class="content">
      <h6>most used service</h6>
      <h4>service name</h4>
      <h4 class="number">500</h4>
    </div>

    <img
      src="@/assets/images/statistics/achivements.png"
      alt="achivement icon"
      class="achivement-img"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-2 {
  position: relative;
  h2 {
    font-size: 1.5rem;
    color: #b9b9c3;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    h6 {
      font-size: 1.2rem;
      color: #6e6b7b;
    }

    h4 {
      font-size: 1.8rem;
      font-weight: bold;
      color: #5e5873;
    }
    .number {
      color: #ea3162;
    }
  }

  .achivement-img {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
