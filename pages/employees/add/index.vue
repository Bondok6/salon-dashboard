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

      <div class="d-flex gap-5 mb-4">
        <el-form-item label="Name of Employee" prop="userName" class="w-50">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone" class="w-50">
          <el-input type="number" v-model="form.phone"> </el-input>
        </el-form-item>
      </div>

      <el-form-item label="Attendance" prop="attendant">
        <el-select v-model="form.attendant" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
        userName: "",
        phone: "",
        attendant: "",
        image: [],
      },
      formRules: {
        userName: [
          {
            required: true,
            message: "Please input name of employee",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input phone number",
          },
        ],
        attendant: [
          {
            required: true,
            message: "Please select attendant",
          },
        ],
      },
      options: [
        {
          value: "1",
          label: "Yes",
        },
        {
          value: "0",
          label: "No",
        },
      ],
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
    createAd() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.image.length === 0) {
            this.$message.error("Please Upload Image");
            return;
          }
          const loading = this.$loading();
          try {
            await this.$store.dispatch("ads/addAd", this.form);
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
