<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Employees</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <div class="d-flex align-items-center gap-4 mb-5">
        <el-upload
          class="upload-demo"
          list-type="picture-card"
          action="#"
          :on-change="handleChange"
          :on-remove="toggleUpload"
          :class="{ hideUpload: !showUpload }"
          :show-file-list="true"
          :auto-upload="false"
          :limit="1"
          accept="image/*"
        >
          <i class="el-icon-upload"></i>
        </el-upload>
        <div class="img-caption">
          <h5>Employee image</h5>
          <h6>Please Upload Image 340*160</h6>
        </div>
      </div>

      <el-form-item
        label="Description Of Advertisement En"
        prop="descriptionEn"
      >
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.descriptionEn"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Description Of Advertisement Ar"
        prop="descriptionAr"
      >
        <el-input type="textarea" :rows="2" v-model="form.descriptionAr">
        </el-input>
      </el-form-item>

      <el-form-item
        label="Description Of Advertisement Heb"
        prop="descriptionAr"
      >
        <el-input type="textarea" :rows="2" v-model="form.descriptionHeb">
        </el-input>
      </el-form-item>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="createE()">
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
        descriptionAr: "",
        descriptionEn: "",
        descriptionHeb: "",
        image: [],
      },
      formRules: {
        descriptionAr: [
          {
            required: true,
            message: "Description Of Advertisement Ar is required",
          },
        ],
        descriptionEn: [
          {
            required: true,
            message: "Description Of Advertisement En is required",
          },
        ],
        descriptionHeb: [
          {
            required: true,
            message: "Description Of Advertisement Heb is required",
          },
        ],
        image: [{ required: true, message: "Image is required" }],
      },
      showUpload: true,
    };
  },
  methods: {
    toggleUpload() {
      this.showUpload = !this.showUpload;
    },
    handleChange(file) {
      this.addForm.image.push(file.raw);
      this.toggleUpload();
    },
    createAd() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          if (this.addForm.image.length === 0) {
            this.$message.error("Please Upload Image");
            return;
          }
          const loading = this.$loading();
          try {
            await this.$store.dispatch("ads/addAd", this.addForm);
            this.$message.success("Advertisement Created Successfully");
            this.$router.push("/ads");
          } catch (error) {
            this.$message.error("Advertisement Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/ads");
    },
  },
};
</script>
