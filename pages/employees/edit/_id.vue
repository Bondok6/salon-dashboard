<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Update Employee</h2>

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
          <h6>Please Upload Image 160*160</h6>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4">
        <el-form-item
          label="Name of Employee"
          prop="empName"
          style="width: 500px"
        >
          <el-input v-model="form.empName"></el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone" style="width: 500px">
          <el-input
            type="number"
            v-model="form.phone"
            placeholder="0950410614"
            oninput="if(this.value.length>10) this.value=this.value.slice(0,10)"
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

    <button class="btn btn--pink btn--add" @click.prevent="updateEmp()">
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
      form: {},
      formRules: {
        empName: [
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
  async created() {
    const data = await this.$store.dispatch(
      "emp/fetchEmployee",
      this.$route.params.id
    );
    this.form = { ...data, image: [] };
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
    updateEmp() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.image.length > 0) {
            delete this.form.profile;
          }
          const loading = this.$loading();
          try {
            await this.$store.dispatch("emp/updateEmployee", this.form);
            this.$message.success("Employee Updated Successfully");
            this.$router.push("/employees");
          } catch (error) {
            this.$message.error("Error while updating employee");
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
