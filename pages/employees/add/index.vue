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
          <h5>Employee image</h5>
          <h6>Please Upload Image 340*160</h6>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4">
        <el-form-item
          label="Name of Employee"
          prop="userName"
          style="width: 500px"
        >
          <el-input v-model="form.userName"></el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone" style="width: 500px">
          <el-input
            type="number"
            v-model="form.phone"
            placeholder="(+20) 01555389225"
          >
          </el-input>
        </el-form-item>
      </div>

      <el-form-item label="Attendance" prop="attendent">
        <el-select v-model="form.attendent" placeholder="Select">
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

    <button class="btn btn--pink btn--add" @click.prevent="createEmp()">
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
        attendent: "",
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
        attendent: [
          {
            required: true,
            message: "Please select attendant",
          },
        ],
      },
      options: [
        {
          value: "PRESENT",
          label: "Present",
        },
        {
          value: "ABSENT",
          label: "Absent",
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
    handleRemove() {
      this.form.image.pop();
      this.toggleUpload();
    },
    createEmp() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.image.length === 0) {
            this.$message.error("Please Upload Image");
            return;
          }
          const loading = this.$loading();
          try {
            await this.$store.dispatch("emp/addEmployee", this.form);
            this.$message.success("Employee Created Successfully");
            this.$router.push("/employees");
          } catch (error) {
            this.$message.error("Advertisement Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/employees");
    },
  },
};
</script>
