<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Update Info</h2>

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

    <button class="btn btn--pink btn--add" @click.prevent="updateInfo()">
      Update
    </button>
    <button class="btn btn--white btn--add" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  mounted() {
    this.form = this.data;
  },
  data() {
    return {
      form: {},
      formRules: {
        titleEn: [{ required: true, message: "Please input title in English" }],
        titleAr: [{ required: true, message: "Please input title in Arabic" }],
        titleHeb: [{ required: true, message: "Please input title in Hebrew" }],
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
    updateInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            const upatedInfo = { about: [this.form] };
            await this.$axios.$patch(`/about/${this.id}`, upatedInfo);
            this.$message.success("Info updated successfully");
            this.$router.push("/about");
          } catch (error) {
            this.$message.error("Info Update Failed");
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
  computed: {
    data() {
      return { ...this.$store.state.about.info[0] };
    },
    id() {
      return this.$store.state.about.aboutId;
    },
  },
};
</script>
