<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Info</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <el-form-item label="Name Of Prargraph En" prop="titleEn">
        <el-input v-model="form.titleEn"></el-input>
      </el-form-item>
      <el-form-item label="Content Of Paragraph En" prop="contentEn">
        <el-input type="textarea" :rows="2" v-model="form.contentEn">
        </el-input>
      </el-form-item>
      <el-form-item label="Name Of Paragraph Ar" prop="titleAr">
        <el-input v-model="form.titleAr"></el-input>
      </el-form-item>
      <el-form-item label="Content Of Paragraph Ar" prop="contentAr">
        <el-input type="textarea" :rows="2" v-model="form.contentAr">
        </el-input>
      </el-form-item>
      <el-form-item label="Name Of Paragraph Heb" prop="titleHeb">
        <el-input v-model="form.titleHeb"></el-input>
      </el-form-item>
      <el-form-item label="Content Of Paragraph Heb" prop="contentHeb">
        <el-input type="textarea" :rows="2" v-model="form.contentHeb">
        </el-input>
      </el-form-item>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="addInfo()">
      Save
    </button>
    <button class="btn btn--white btn--add" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        titleEn: "",
        titleAr: "",
        titleHep: "",
        contentAr: "",
        contentEn: "",
        contentheb: "",
      },
      formRules: {
        titleEn: [{ required: true, message: "Please input title in English" }],
        titleAr: [{ required: true, message: "Please input title in Arabic" }],
        titleHep: [{ required: true, message: "Please input title in Hebrew" }],
        contentEn: [
          { required: true, message: "Please input content in English" },
        ],
        contentAr: [
          { required: true, message: "Please input content in Arabic" },
        ],
        contentHeb: [
          { required: true, message: "Please input content in Hebrew" },
        ],
      },
    };
  },
  methods: {
    addInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            await this.$store.dispatch("about/addInfo", this.form);
            this.$message.success("Info created successfully");
            this.$router.push("/about");
          } catch (error) {
            this.$message.error("Info Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/about");
    },
  },
};
</script>
