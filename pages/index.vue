<template>
  <section class="text-center">
    <h1>Home Page, Welcome {{ user.userName }} 🙋‍♂️</h1>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.$storage.getUniversal("user");
    },
  },
};
</script>
