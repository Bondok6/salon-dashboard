<template>
  <section class="ads-form">
    <h2 class="ads-form__title">Add Advertisements</h2>

    <el-form :rules="addFormRules" :model="addForm" ref="addForm" class="mt-5">
      <div class="d-flex align-items-center gap-4 mb-5">
        <el-upload
          class="upload-demo"
          list-type="picture-card"
          action="#"
          :on-change="toggleUpload"
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
          <h5>Advertisement image</h5>
          <h6>Please Upload Image 340*160</h6>
        </div>
      </div>

      <el-form-item
        label="Description Of Advertisement En"
        prop="descriptionEn"
      >
        <el-input type="textarea" :rows="2" v-model="addForm.descriptionAr">
        </el-input>
      </el-form-item>

      <el-form-item
        label="Description Of Advertisement Ar"
        prop="descriptionAr"
      >
        <el-input type="textarea" :rows="2" v-model="addForm.descriptionEn">
        </el-input>
      </el-form-item>

      <el-form-item
        label="Description Of Advertisement Heb"
        prop="descriptionAr"
      >
        <el-input type="textarea" :rows="2" v-model="addForm.descriptionHeb">
        </el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      addForm: {
        descriptionAr: "",
        descriptionEn: "",
        descriptionHeb: "",
        image: "",
      },
      addFormRules: {
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
      fileList: [],
      previewVisible: false,
      previewImage: "",
      file: null,
      showUpload: true,
    };
  },
  methods: {
    toggleUpload() {
      this.showUpload = !this.showUpload;
    },
    handlePreview(file) {
      console.log(file);
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
  },
};
</script>
