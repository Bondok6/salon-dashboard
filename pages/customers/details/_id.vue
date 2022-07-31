<template>
  <section>
    <div class="header">
      <h2>
        <span>Customers > </span
        >{{ customer.firstName + " " + customer.lastName }}
      </h2>
    </div>
    <nav class="customers_nav">
      <nuxt-link
        :to="`/customers/details/${customer.id}`"
        class="customers_nav--item active-link"
        >info</nuxt-link
      >

      <nuxt-link
        :to="`/customers/details/reservations/${customer.id}`"
        class="customers_nav--item"
        >reservations</nuxt-link
      >

      <nuxt-link
        :to="`/customers/details/notifications/${customer.id}`"
        class="customers_nav--item"
        >notifications</nuxt-link
      >

      <nuxt-link
        :to="`/customers/details/messages/${customer.id}`"
        class="customers_nav--item"
        >messages</nuxt-link
      >
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
