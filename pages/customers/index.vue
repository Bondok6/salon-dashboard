<template>
  <section>
    <uiEmpty
      v-if="!customers.length"
      imgSrc="customers/no-customers.png"
      caption="No customers have been added yet."
    />

    <customersList :tableData="customers" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("customers/fetchCustomers");
  },
  computed: {
    customers() {
      return this.$store.state.customers.customers;
    },
  },
};
</script>
