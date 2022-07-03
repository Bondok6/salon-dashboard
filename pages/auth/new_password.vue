<template>
  <el-form
    :rules="newPasswordFormRules"
    :model="newPasswordForm"
    ref="newPasswordForm"
    class="form form--reset"
  >
    <h4>New Password</h4>
    <h6 class="form__title mb-5">
      Enter new password make sure to create <br />
      it different from the previous one
    </h6>

    <el-form-item prop="newPassowrd" label=" ">
      <el-input
        v-model="newPasswordForm.newPassword"
        placeholder="NEW PASSWORD"
        type="password"
        show-password
      />
    </el-form-item>

    <el-form-item prop="confirmPassword" label=" ">
      <el-input
        v-model="newPasswordForm.confirmPassword"
        placeholder="CONFIRM PASSWORD"
        type="password"
        show-password
      />
    </el-form-item>

    <button type="submit" class="btn btn--pink" @click.prevent="">
      CONFIRM
    </button>
  </el-form>
</template>

<script>
export default {
  layout: "auth",
  // middleware: "loggedIn",
  data() {
    return {
      newPasswordForm: {
        newPassword: "",
        confirmPassword: "",
      },
      newPasswordFormRules: {
        newPassword: [{ required: true, message: "new password is required" }],
        confirmPassword: [
          { required: true, message: "confirm password is required" },
        ],
      },
    };
  },
};
</script>

<style></style>
