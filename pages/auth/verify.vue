<template>
  <el-form
    :rules="verifyFormRules"
    :model="verifyForm"
    ref="verifyForm"
    class="form form--reset"
  >
    <figure>
      <img src="~/assets/images/auth/verify.png" alt="verify-icon" />
      <figcaption>verification code</figcaption>
    </figure>
    <h6 class="form__title">Enter 4 digit code sent to your phone number</h6>

    <el-form-item prop="code" label=" ">
      <el-input
        v-model="verifyForm.code"
        placeholder="CODE"
        type="number"
        maxLength="4"
      />
    </el-form-item>

    <button type="submit" class="btn btn--pink" @click.prevent="verify">
      SEND
    </button>
  </el-form>
</template>

<script>
export default {
  middleware: "loggedIn",
  auth: false,
  layout: "auth",
  mounted() {
    this.verifyForm.phone = localStorage.getItem("phone");
  },
  data() {
    return {
      verifyForm: {
        phone: "",
        code: "55555",
      },
      verifyFormRules: {
        code: [{ required: true, message: "code is required" }],
      },
    };
  },
  methods: {
    verify() {
      this.$refs.verifyForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            const response = await this.$axios.post(
              "/auth/forget-password-verify",
              this.verifyForm
            );
            // Save token to localStorage
            localStorage.setItem("token", response.data.token);

            this.$message.success("Please, enter new password");
            this.$router.push("/auth/new_password");
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
