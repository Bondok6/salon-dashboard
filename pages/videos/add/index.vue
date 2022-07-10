<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Video</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <el-form-item label="Link of Video" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <div class="d-flex flex-wrap gap-5">
        <el-form-item
          label="Title of Video En"
          prop="titleEn"
          style="width: 300px"
        >
          <el-input v-model="form.titleEn"></el-input>
        </el-form-item>

        <el-form-item
          label="Title of Video Ar"
          prop="titleAr"
          style="width: 300px"
        >
          <el-input v-model="form.titleAr"> </el-input>
        </el-form-item>

        <el-form-item
          label="Title of Video Heb"
          prop="titleHeb"
          style="width: 300px"
        >
          <el-input v-model="form.titleHeb"> </el-input>
        </el-form-item>
      </div>
      <el-form-item label="Brief of Video En" prop="briefEn">
        <el-input type="textarea" :rows="2" v-model="form.briefEn"> </el-input>
      </el-form-item>

      <el-form-item label="Brief of Video Ar" prop="briefAr">
        <el-input type="textarea" :rows="2" v-model="form.briefAr"></el-input>
      </el-form-item>

      <el-form-item label="Brief of Video Heb" prop="briefHeb">
        <el-input type="textarea" :rows="2" v-model="form.briefHeb"></el-input>
      </el-form-item>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="createVideo()">
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
        link: "",
        titleEn: "",
        titleAr: "",
        titleHeb: "",
        briefEn: "",
        briefAr: "",
        briefHeb: "",
      },
      // prettier-ignore
      formRules: {
        link: [{ required: true, message: "Please input link" }],
        titleEn: [{ required: true, message: "Please input title in English" }],
        titleAr: [{ required: true, message: "Please input title in Arabic" }],
        titleHeb: [{ required: true, message: "Please input title in Hebrew" }],
        briefEn: [{ required: true, message: "Please input brief in English" }],
        briefAr: [{ required: true, message: "Please input brief in Arabic" }],
        briefHeb: [{ required: true, message: "Please input brief in Hebrew" }],
      },
    };
  },
  methods: {
    createVideo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            await this.$store.dispatch("videos/addVideo", this.form);
            this.$message.success("Video Created Successfully");
            this.$router.push("/videos");
          } catch (error) {
            this.$message.error("Video Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/videos");
    },
  },
};
</script>
