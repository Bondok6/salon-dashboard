<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add User</h2>

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
          <h5>Image Of User</h5>
          <h6>Please Upload Image 160*160</h6>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4">
        <el-form-item label="User Name" prop="userName" style="width: 500px">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone" style="width: 500px">
          <el-input
            type="number"
            v-model="form.phone"
            placeholder="(+973) 1555389225"
          >
          </el-input>
        </el-form-item>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4">
        <el-form-item prop="password" label="Password" style="width: 500px">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Role" prop="role">
          <el-select
            v-model="form.role"
            placeholder="Select Role"
            style="width: 500px"
          >
            <el-option
              v-for="role in roleOptions"
              :key="role.value"
              :label="role.label"
              :value="role.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="createUser()">
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
        image: [],
        userName: "",
        phone: "",
        password: "",
        role: "",
      },
      formRules: {
        userName: [
          { required: true, message: "Please input name of employee" },
        ],
        phone: [{ required: true, message: "Please input phone number" }],
        password: [{ required: true, message: "Please input password" }],
        role: [{ required: true, message: "Please select a role" }],
      },
      roleOptions: [
        {
          value: "ADMIN",
          label: "Admin",
        },
        {
          value: "EMPLOYEE",
          label: "Employee",
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
    createUser() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.image.length === 0) {
            this.$message.error("Please Upload Image");
            return;
          }
          const loading = this.$loading();
          try {
            await this.$store.dispatch("admin/addUser", this.form);
            this.$message.success("User Created Successfully");
            this.$router.push("/admins");
          } catch (error) {
            this.$message.error("User Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/admins");
    },
  },
};
</script>
