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
  middleware: "loggedIn",
  auth: false,
  layout: "auth",
  data() {
    return {
      resetForm: {
        phone: "+201008453103",
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
          const loading = this.$loading();
          try {
            await this.$axios.post("/auth/forget-password", this.resetForm);
            this.$message.success("Enter 4-digit code to reset password");
            // save phone number to localStorage
            localStorage.setItem("phone", this.resetForm.phone);
            this.$router.push("/auth/verify");
          } catch (error) {
            this.$message.error("Something went wrong, please try again");
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>

<style></style>
