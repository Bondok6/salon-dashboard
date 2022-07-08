<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Advertisements</h2>

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
          <h5>Advertisement image</h5>
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

    <button class="btn btn--pink btn--add" @click.prevent="updateAd()">
      Update
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
      form: {},
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
  async created() {
    const data = await this.$store.dispatch(
      "ads/fetchAd",
      this.$route.params.id
    );
    this.form = { ...data, image: [] };
    console.log(this.form);
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
    updateAd() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.image.length > 0) {
            delete this.form.photo;
          }
          console.log(this.form);
          const loading = this.$loading();
          try {
            await this.$store.dispatch("ads/updateAd", this.form);
            this.$message.success("Advertisement Updated Successfully");
            this.$router.push("/ads");
          } catch (error) {
            this.$message.error("Error While Updating Advertisement");
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
