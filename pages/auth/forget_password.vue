<template>
  <el-form
    :rules="resetFormRules"
    :model="resetForm"
    ref="resetForm"
    class="form form--reset"
  >
    <figure>
      <img src="~/assets/images/lock.png" alt="lock" />
      <figcaption>forget password</figcaption>
    </figure>
    <h6 class="form__title">Enter your phone number to reset password</h6>

    <el-form-item prop="phone" label=" ">
      <el-input
        v-model="resetForm.phone"
        placeholder="PHONE NUMBER"
        type="text"
      />
    </el-form-item>

    <button type="submit" class="btn btn--pink" @click.prevent="reset">
      RESET
    </button>
  </el-form>
</template>

<script>
export default {
  layout: "auth",
  // middleware: "loggedIn",
  data() {
    return {
      resetForm: {
        phone: "",
      },
      resetFormRules: {
        phone: [{ required: true, message: "phone is required" }],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.resetForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
        }
      });
    },
  },
};
</script>

<style></style>
