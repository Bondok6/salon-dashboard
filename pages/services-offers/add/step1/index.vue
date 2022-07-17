<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Service</h2>

    <div class="text-center my-5">
      <img src="@/assets/images/services/step1.png" alt="step1" />
    </div>

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
          <h5>Service Images</h5>
          <h6>Please Upload Image 160*160</h6>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-5">
        <el-form-item
          label="Name Of Service En"
          prop="nameEn"
          style="width: 300px"
        >
          <el-input v-model="form.nameEn"></el-input>
        </el-form-item>

        <el-form-item
          label="Name Of Service Ar"
          prop="nameAr"
          style="width: 300px"
        >
          <el-input v-model="form.nameAr"> </el-input>
        </el-form-item>

        <el-form-item
          label="Name Of Service Heb"
          prop="nameHeb"
          style="width: 300px"
        >
          <el-input v-model="form.nameHeb"> </el-input>
        </el-form-item>
      </div>
      <el-form-item label="Description Of Service En" prop="descriptionEn">
        <el-input type="textarea" :rows="2" v-model="form.descriptionEn">
        </el-input>
      </el-form-item>

      <el-form-item label="Description Of Service Ar" prop="descriptionAr">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.descriptionAr"
        ></el-input>
      </el-form-item>

      <el-form-item label="Description Of Service Heb" prop="descriptionHeb">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.descriptionHeb"
        ></el-input>
      </el-form-item>

      <div class="d-flex gap-5">
        <el-form-item label="Consist Of Sessions" prop="enabled">
          <el-switch
            v-model="enabled"
            active-value="true"
            inactive-value="false"
            active-color="#EA3162"
          ></el-switch>
        </el-form-item>

        <el-form-item prop="numOfSessions" v-if="enabled === 'true'">
          <span class="d-block">Number Of Sessions</span>
          <el-input v-model="form.numOfSessions" type="number"></el-input>
        </el-form-item>

        <el-form-item label="Pick Color" prop="color">
          <el-color-picker v-model="form.color"></el-color-picker>
        </el-form-item>
      </div>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="goNext()">
      Next
    </button>
    <button class="btn btn--white btn--add" @click.prevent="goBack()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  mounted() {
    // get data from sessionStorage
    this.form = JSON.parse(sessionStorage.getItem("form1")) || {
      nameEn: "",
      nameAr: "",
      nameHeb: "",
      descriptionEn: "",
      descriptionAr: "",
      descriptionHeb: "",
      numOfSessions: "",
      color: "#F8AF03s",
      image: [],
    };
  },
  data() {
    return {
      form: {
        nameEn: "",
        nameAr: "",
        nameHeb: "",
        descriptionEn: "",
        descriptionAr: "",
        descriptionHeb: "",
        numOfSessions: "",
        color: "#F8AF03s",
        image: [],
      },
      formRules: {
        nameEn: [{ required: true, message: "Please enter name in English" }],
        nameAr: [{ required: true, message: "Please enter name in Arabic" }],
        nameHeb: [{ required: true, message: "Please enter name in Hebrew" }],
        descriptionEn: [
          { required: true, message: "Please enter description in English" },
        ],
        descriptionAr: [
          { required: true, message: "Please enter description in Arabic" },
        ],
        descriptionHeb: [
          { required: true, message: "Please enter description in Hebrew" },
        ],
        numOfSessions: [
          { required: true, message: "Please enter number of sessions" },
        ],
        color: [{ required: true, message: "Please pick a color" }],
      },
      showUpload: true,
      enabled: "false",
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
    goNext() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.image.length == 0) {
            this.$message.error("Please upload image");
            return;
          }
          sessionStorage.setItem("form1", JSON.stringify(this.form));
          this.$router.push("/services-offers/add/step2");
        }
      });
    },
    goBack() {
      // remove data from sessionStorage
      sessionStorage.removeItem("form1", "form2");
      this.$router.push("/services-offers");
    },
  },
};
</script>

<style></style>
