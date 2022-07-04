<template>
  <el-form
    :rules="loginFormRules"
    :model="loginForm"
    ref="loginForm"
    class="form"
  >
    <figure>
      <img src="~/assets/images/logo.png" alt="logo" />
      <figcaption class="form__title">
        Please enter user name and password to login
      </figcaption>
    </figure>

    <el-form-item prop="userName" label=" ">
      <el-input
        v-model="loginForm.userName"
        placeholder="USER NAME"
        type="text"
      />
    </el-form-item>

    <el-form-item prop="password" label=" ">
      <el-input
        v-model="loginForm.password"
        placeholder="PASSWORD"
        type="password"
        show-password
      />
    </el-form-item>

    <nuxt-link to="/auth/forget_password"> forget password? </nuxt-link>

    <button type="submit" class="btn btn--pink" @click.prevent="login">
      LOGIN
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
      loginForm: {
        userName: "admin-99",
        password: "123456",
      },
      loginFormRules: {
        userName: [{ required: true, message: "username is required" }],
        password: [{ required: true, message: "password is required" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            const response = await this.$auth.loginWith("local", {
              data: this.loginForm,
            });
            const { user } = response.data;
            this.$auth.$storage.setUniversal("user", user, true);
            this.$message.success("Login Success");
            this.$router.push("/");
          } catch (error) {
            this.$message.error("Login Failed");
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
