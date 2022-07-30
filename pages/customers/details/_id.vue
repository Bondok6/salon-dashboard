<template>
  <section>
    <div class="header">
      <h2>
        <span>Customers > </span
        >{{ customer.firstName + " " + customer.lastName }}
      </h2>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to=""> info </router-link>
        </li>
        <li>
          <router-link to=""> reservations </router-link>
        </li>
        <li>
          <router-link to=""> notifications </router-link>
        </li>
        <li>
          <router-link to=""> messages </router-link>
        </li>
      </ul>
    </nav>
    <section class="px-5">
      <div class="d-flex align-items-center gap-5 my-4">
        <div class="info">
          <img src="@/assets/images/customers/name.png" alt="name-icon" />
          <span>{{ customer.firstName }}</span>
        </div>
        <div class="info">
          <img src="@/assets/images/customers/name.png" alt="name-icon" />
          <span>{{ customer.lastName }}</span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-5 my-4">
        <div class="info">
          <img src="@/assets/images/customers/gender.png" alt="gender-icon" />
          <span>{{ customer.gender.toLowerCase() }}</span>
        </div>
        <div class="info">
          <img src="@/assets/images/customers/age.png" alt="age-icon" />
          <span>{{ customer.age }}</span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-5 my-4">
        <div class="info info--large">
          <img src="@/assets/images/customers/phone.png" alt="phone-icon" />
          <span>{{ customer.phone }}</span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-5 my-4">
        <div class="info info--large">
          <img
            src="@/assets/images/customers/location.png"
            alt="location-icon"
          />
          <span>{{ customer.city.nameEn }}</span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  async fetch({ store, route }) {
    const { id } = route.params;
    await store.dispatch("customers/fetchCustomer", id);
  },
  computed: {
    customer() {
      return this.$store.state.customers.customer;
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  background-color: #fafafa;
  width: 20rem;
  height: 5.5rem;
  padding: 0 2rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  span {
    font-size: 1.6rem;
  }

  &--large {
    width: 40rem;
  }
}
</style>
