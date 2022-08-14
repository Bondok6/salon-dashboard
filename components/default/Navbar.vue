<template>
  <nav class="navbar">
    <button type="button" @click="logout" class="logout-btn">
      <img src="@/assets/images/navbar/logout.svg" alt="logout" />
      Logout
    </button>

    <div class="navbar__left">
      <!-- <ul class="nav-links">
        <li>
          <img src="@/assets/images/navbar/cart.svg" alt="cart-icon" />
        </li>
      </ul> -->
      <figure>
        <img src="@/assets/images/navbar/avatar.svg" alt="avatar" />
        <figcaption>
          <span>{{ user.firstName }}</span>
          <span>{{ user.role }}</span>
        </figcaption>
      </figure>
    </div>
  </nav>
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
