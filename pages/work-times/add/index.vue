<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Working Days And Hours</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="">Save</button>
    <button class="btn btn--white btn--add" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      formRules: {},
    };
  },
  methods: {
    goTo() {
      this.$router.push("/work-times");
    },
  },
};
</script>
