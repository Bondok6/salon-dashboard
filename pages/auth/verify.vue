<template>
  <el-form
    :rules="verifyFormRules"
    :model="verifyForm"
    ref="verifyForm"
    class="form form--reset"
  >
    <figure>
      <img src="~/assets/images/verify.png" alt="verify-icon" />
      <figcaption>verification code</figcaption>
    </figure>
    <h6 class="form__title">Enter 5 digit code sent to your phone number</h6>

    <el-form-item prop="code" label=" ">
      <el-input v-model="verifyForm.code" placeholder="CODE" type="number" />
    </el-form-item>

    <button type="submit" class="btn btn--pink" @click.prevent="verify">
      SEND
    </button>
  </el-form>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
  mounted() {
    this.verifyForm.phone = localStorage.getItem("phone");
  },
  data() {
    return {
      verifyForm: {
        phone: "",
        code: "",
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
            console.log(this.verifyForm);
            await this.$axios.post(
              "/auth/forget-password-verify",
              this.verifyForm
            );
            this.$message.success("Please, enter new password");
            this.$router.push("/auth/new-password");
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
