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
        class="customers_nav--item active-link"
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
    <!-- Reservations -->
    <customersReservations :tableData="reservations" class="my-2" />

    <!-- Pagination -->
    <el-pagination
      class="m-5 position-absolute right-0"
      v-if="totalPages > 1"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="fetchCustomerReservations"
      :total="totalPages * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  async mounted() {
    const { id } = this.$route.params;
    await this.$store.dispatch("customers/fetchCustomer", id);
    await this.fetchCustomerReservations();
  },
  data() {
    return {
      page: 1,
      totalPages: 1,
      reservations: [],
    };
  },
  methods: {
    async fetchCustomerReservations() {
      const { id } = this.$route.params;
      let params = { page: this.page, limit: 5, userId: id };
      const response = await this.$axios.$get("/reservations", { params });
      this.reservations = await response.docs;
      this.totalPages = await response.totalPages;
      this.page = await response.page;
    },
  },
  computed: {
    customer() {
      return this.$store.state.customers.customer;
    },
  },
};
</script>
