<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Service</h2>

    <div class="text-center my-5">
      <img src="@/assets/images/services/step2.png" alt="step2" />
    </div>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <el-form-item prop="employees">
        <span class="d-block">Employees</span>
        <el-select
          v-model="form.employees"
          multiple
          filterable
          placeholder="Select Employees"
          class="d-block"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="timeOfService">
        <span class="d-block">Time of Services</span>
        <el-input-number
          v-model="form.timeOfService"
          @change="handleChange"
          :min="0"
          :max="60"
          :step="5"
          :default-value="0"
        ></el-input-number>
      </el-form-item>
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
  data() {
    return {
      form: {
        employees: [],
        timeOfService: "",
      },
      formRules: {
        employees: [{ required: true, message: "Please select employees" }],
        timeOfService: [
          { required: true, message: "Please enter time of service" },
        ],
      },
      employees: [
        {
          id: 1,
          name: "John Doe",
        },
        {
          id: 2,
          name: "Jane Doe",
        },
        {
          id: 3,
          name: "Jack Doe",
        },
        {
          id: 4,
          name: "Jill Doe",
        },
        {
          id: 5,
          name: "John Doe",
          image: "https://picsum.photos/200/300",
        },
      ],
    };
  },
  methods: {
    goNext() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          sessionStorage.setItem("form2", JSON.stringify(this.form));
          this.$router.push("/services-offers/add/step3");
        }
      });
    },
    goBack() {
      this.$router.push("/services-offers/add/step1");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
