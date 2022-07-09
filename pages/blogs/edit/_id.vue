<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Blog</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <div class="d-flex align-items-center gap-4 mb-5">
        <el-upload
          class="upload-demo"
          list-type="picture-card"
          action="#"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :class="{ hideUpload: !showUpload }"
          :show-file-list="true"
          :auto-upload="false"
          :limit="1"
          accept="image/*"
        >
          <i class="el-icon-upload"></i>
        </el-upload>
        <div class="img-caption">
          <h5>Blog image</h5>
          <h6>Please Upload Image 160*160</h6>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-5">
        <el-form-item
          label="Title of Blog En"
          prop="titleEn"
          style="width: 300px"
        >
          <el-input v-model="form.titleEn"></el-input>
        </el-form-item>

        <el-form-item
          label="Title of Blog Ar"
          prop="titleAr"
          style="width: 300px"
        >
          <el-input v-model="form.titleAr"> </el-input>
        </el-form-item>

        <el-form-item
          label="Title of Blog Heb"
          prop="titleHeb"
          style="width: 300px"
        >
          <el-input v-model="form.titleHeb"> </el-input>
        </el-form-item>
      </div>
      <el-form-item label="Brief of Blog En" prop="briefEn">
        <el-input
          type="textarea"
          :rows="1"
          maxlength="300"
          v-model="form.briefEn"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="Brief of Blog Ar" prop="briefAr">
        <el-input
          type="textarea"
          :rows="1"
          maxlength="300"
          v-model="form.briefAr"
        ></el-input>
      </el-form-item>

      <el-form-item label="Brief of Blog Heb" prop="briefHeb">
        <el-input
          type="textarea"
          :rows="1"
          maxlength="300"
          v-model="form.briefHeb"
        ></el-input>
      </el-form-item>

      <el-form-item label="Content Of Blog En" prop="contentEn">
        <el-input type="textarea" :rows="2" v-model="form.contentEn"></el-input>
      </el-form-item>

      <el-form-item label="Content Of Blog Ar" prop="contentAr">
        <el-input type="textarea" :rows="2" v-model="form.contentAr"></el-input>
      </el-form-item>

      <el-form-item label="Content Of Blog Heb" prop="contentHeb">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.contentHeb"
        ></el-input>
      </el-form-item>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="updateBlog()">
      Save
    </button>
    <button class="btn btn--white btn--add" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  async created() {
    const { id } = this.$route.params;
    const data = await this.$store.dispatch("blogs/fetchBlog", id);
    console.log(data);
    this.form = { ...data, image: [] };
  },
  data() {
    return {
      form: {},
      // prettier-ignore
      formRules: {
        titleEn: [{ required: true, message: "Please input title in English" }],
        titleAr: [{ required: true, message: "Please input title in Arabic" }],
        titleHeb: [{ required: true, message: "Please input title in Hebrew" }],
        briefEn: [{ required: true, message: "Please input brief in English" }],
        briefAr: [{ required: true, message: "Please input brief in Arabic" }],
        briefHeb: [{ required: true, message: "Please input brief in Hebrew" }],
        contentEn: [{ required: true, message: "Please input content in English" }],
        contentAr: [{ required: true, message: "Please input content in Arabic" }],
        contentHeb: [{ required: true, message: "Please input content in Hebrew" }],
      },
      showUpload: true,
    };
  },
  methods: {
    toggleUpload() {
      this.showUpload = !this.showUpload;
    },
    handleChange(file) {
      this.form.image.push(file.raw);
      this.toggleUpload();
    },
    handleRemove() {
      this.form.image.pop();
      this.toggleUpload();
    },
    updateBlog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.image.length > 0) {
            delete this.form.images;
          }
          const loading = this.$loading();
          try {
            await this.$store.dispatch("blogs/updateBlog", this.form);
            this.$message.success("Blog Updated Successfully");
            this.$router.push("/blogs");
          } catch (error) {
            this.$message.error("Blog Updated Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/blogs");
    },
  },
};
</script>
