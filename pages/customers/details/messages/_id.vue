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
        class="customers_nav--item"
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
        class="customers_nav--item active-link"
        >messages</nuxt-link
      >
    </nav>
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
