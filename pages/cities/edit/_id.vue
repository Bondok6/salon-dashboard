<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Update City</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <el-form-item label="Name of city En" prop="nameEn">
        <el-input v-model="form.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="Name of city Ar" prop="nameAr">
        <el-input v-model="form.nameAr"></el-input>
      </el-form-item>
      <el-form-item label="Name of city Heb" prop="nameHep">
        <el-input v-model="form.nameHep"></el-input>
      </el-form-item>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="updateCity()">
      Update
    </button>
    <button class="btn btn--white btn--add" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  async mounted() {
    const { id } = this.$route.params;
    this.form = await this.$store.dispatch("cities/fetchCity", id);
  },
  data() {
    return {
      form: {},
      formRules: {
        NameEn: [{ required: true, message: "Please input Name in English" }],
        NameAr: [{ required: true, message: "Please input Name in Arabic" }],
        NameHep: [{ required: true, message: "Please input Name in Hebrew" }],
      },
    };
  },
  methods: {
    updateCity() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            await this.$store.dispatch("cities/updateCity", this.form);
            this.$message.success("City updated successfully");
            this.$router.push("/cities");
          } catch (error) {
            this.$message.error("City Update Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/cities");
    },
  },
};
</script>
