<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Send Notification</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <div class="d-flex flex-wrap gap-5">
        <el-form-item
          label="Title of Notification En"
          prop="titleEn"
          style="width: 300px"
        >
          <el-input v-model="form.titleEn"></el-input>
        </el-form-item>

        <el-form-item
          label="Title of Notification Ar"
          prop="titleAr"
          style="width: 300px"
        >
          <el-input v-model="form.titleAr"> </el-input>
        </el-form-item>

        <el-form-item
          label="Title of Notification Heb"
          prop="titleHeb"
          style="width: 300px"
        >
          <el-input v-model="form.titleHeb"> </el-input>
        </el-form-item>
      </div>

      <el-form-item label="Content Of Notification En" prop="contentEn">
        <el-input type="textarea" :rows="2" v-model="form.contentEn"></el-input>
      </el-form-item>

      <el-form-item label="Content Of Notification Ar" prop="contentAr">
        <el-input type="textarea" :rows="2" v-model="form.contentAr"></el-input>
      </el-form-item>

      <el-form-item label="Content Of Notification Heb" prop="contentHeb">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.contentHeb"
        ></el-input>
      </el-form-item>
    </el-form>

    <button
      class="btn btn--pink btn--add"
      @click.prevent="createNotification()"
    >
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
        titleHeb: "",
        contentEn: "",
        contentAr: "",
        contentHeb: "",
      },
      // prettier-ignore
      formRules: {
        titleEn: [{ required: true, message: "Please input title in English" }],
        titleAr: [{ required: true, message: "Please input title in Arabic" }],
        titleHeb: [{ required: true, message: "Please input title in Hebrew" }],
        contentEn: [{ required: true, message: "Please input content in English" }],
        contentAr: [{ required: true, message: "Please input content in Arabic" }],
        contentHeb: [{ required: true, message: "Please input content in Hebrew" }],
      },
    };
  },
  methods: {
    createNotification() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            // Request to create notification
            this.$message.success("Notification has been sent successfully");
            this.$router.go(-1);
          } catch (error) {
            this.$message.error("Something went wrong");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.go(-1);
    },
  },
};
</script>
