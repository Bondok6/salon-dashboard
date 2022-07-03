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

    <button type="submit" class="btn btn--pink" @click.prevent="">SEND</button>
  </el-form>
</template>

<script>
export default {
  layout: "auth",
  // middleware: "loggedIn",
  data() {
    return {
      verifyForm: {
        code: "",
      },
      verifyFormRules: {
        code: [{ required: true, message: "code is required" }],
      },
    };
  },
};
</script>

<style></style>
