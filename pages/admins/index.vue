<template>
  <section>
    <uiAddButton text="Add User" @click="goTo()" />

    <uiEmpty
      v-if="!users.length"
      imgSrc="admin/no-users.png"
      caption="No users have been added yet."
    />

    <adminUsersList :tableData="users" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("admin/fetchUsers");
  },
  methods: {
    goTo() {
      this.$router.push("/admins/add");
    },
  },
  computed: {
    users() {
      return this.$store.state.admin.users;
    },
  },
};
</script>
