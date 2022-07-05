<template>
  <section class="text-center">
    <h1>Home Page</h1>

    <button @click="logout">LOG OUT</button>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
      // Clear LocalStorage
      localStorage.clear();
      // Clear Cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString());
      });
    },
  },
  computed: {
    user() {
      return this.$auth.$storage.getUniversal("user");
    },
  },
};
</script>
