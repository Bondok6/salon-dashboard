<template>
  <div class="card-1">
    <h2>statistics</h2>
    <ul class="items">
      <li class="item">
        <img src="@/assets/images/statistics/icon-1.png" alt="icon-1" />
        <div>
          <h6 class="number">230</h6>
          <h6 class="title">Reservations</h6>
        </div>
      </li>
      <li class="item">
        <img src="@/assets/images/statistics/icon-2.png" alt="icon-2" />
        <div>
          <h6 class="number">8.549k</h6>
          <h6 class="title">Customers</h6>
        </div>
      </li>
      <li class="item">
        <img src="@/assets/images/statistics/icon-3.png" alt="icon-3" />
        <div>
          <h6 class="number">2</h6>
          <h6 class="title">Absent Employees</h6>
        </div>
      </li>
      <li class="item">
        <img src="@/assets/images/statistics/icon-4.png" alt="icon-4" />
        <div>
          <h6 class="number">$4055</h6>
          <h6 class="title">Revenue</h6>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-1 {
  padding: 2rem;

  h2 {
    font-size: 2rem;
    color: #5e5873;
  }

  .items {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    list-style: none;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      img {
        width: 50px;
        height: 50px;
      }

      .number {
        font-size: 1.8rem;
        font-weight: bold;
        color: #5e5873;
      }

      .title {
        font-size: 1.2rem;
        color: #6e6b7b;
      }
    }
  }
}
</style>
