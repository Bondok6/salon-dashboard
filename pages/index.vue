<template>
  <section class="text-center">
    <h1>Home Page</h1>
    <p>
      This is the home page. You can see the progress of the loading bar below.
    </p>
    <h2>Is LoggedIn, {{ $auth.loggedIn }}</h2>

    <h3>Welcome, {{ user.userName }}</h3>
    <h3>Role: {{ user.role }}</h3>

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
