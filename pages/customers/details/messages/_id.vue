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

    <section class="messages">
      <div class="message">
        <div class="message__date">
          {{ Date.now().toLocaleString() }}
        </div>
        <p class="message__body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ea,
          sunt tempora dolores expedita id.
        </p>
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
.messages {
  margin: 2rem;

  .message {
    border-radius: 5px;
    background-color: #fafafa;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;

    .message__date {
      font-size: 1.2rem;
      color: #949494;
      margin-bottom: 1rem;
    }

    .message__body {
      color: #3d3d3d;
      font-size: 1.4rem;
    }
  }
}
</style>
