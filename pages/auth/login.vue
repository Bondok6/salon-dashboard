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

    <el-form-item prop="username" label=" ">
      <el-input
        v-model="loginForm.username"
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
  layout: "auth",
  // middleware: "loggedIn",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [{ required: true, message: "username is required" }],
        password: [{ required: true, message: "password is required" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          console.log(this.loginForm);
          try {
            await this.$auth.loginWith("local", { data: this.loginForm });
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
