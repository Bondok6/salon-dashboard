<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Update Service</h2>

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
            v-for="emp in validEmployees"
            :key="emp.id"
            :label="emp.empName"
            :value="emp.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="deuration">
        <span class="d-block">Time of Services</span>
        <el-input-number
          v-model="form.deuration"
          :min="0"
          :step="5"
          :default-value="0"
          @change="handleChange"
        ></el-input-number>
        <span>Minutes</span>
      </el-form-item>
    </el-form>

    <div class="slots w-100">
      <h6 class="slots__title">Time Slotes Over Day</h6>
      <ul class="slots__items">
        <li class="slots__time" v-for="slot in slots" :key="slot">
          {{ slot }}
        </li>
      </ul>
    </div>

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
  async mounted() {
    this.validEmployees = await this.$store.dispatch("emp/fetchValidEmployees");
    const { id } = this.$route.params;
    const data = await this.$store.dispatch("services/fetchService", id);
    this.form = {
      employees: data.employees,
      deuration: data.deuration,
    };
    const [startTime, endTime] = await this.$store.dispatch(
      `workTimes/fetchWorkingHoursCurrentDay`
    );
    this.slots = this.generateSlots(startTime, endTime, this.form.deuration);
  },
  data() {
    return {
      form: {},
      formRules: {
        employees: [{ required: true, message: "Please select employees" }],
        deuration: [
          { required: true, message: "Please enter time of service" },
        ],
      },
      validEmployees: [],
      slots: null,
    };
  },
  methods: {
    goNext() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.employees = this.form.employees.map((emp) => emp.id);
          sessionStorage.setItem("form2", JSON.stringify(this.form));
          const { id } = this.$route.params;
          this.$router.push(`/services-offers/edit/step3/${id}`);
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    async handleChange(duration) {
      const [startTime, endTime] = await this.$store.dispatch(
        `workTimes/fetchWorkingHoursCurrentDay`
      );
      this.slots = this.generateSlots(startTime, endTime, duration);
    },
    generateSlots(start, end, duration) {
      let startTime = this.$moment(start, "HH:mm");
      let endTime = this.$moment(end, "HH:mm").add(1, "days");
      let slots = [];
      while (startTime < endTime) {
        slots.push(startTime.format("hh:mm a"));
        startTime.add(duration, "minutes");
      }
      return slots;
    },
  },
};
</script>

<style lang="scss" scoped>
.slots {
  margin: 2rem;
  padding: 1rem;
  background: #fafafa;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &__title {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  &__items {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }

  &__time {
    padding: 0.8rem;
    cursor: pointer;
    font-size: 1.5rem;
    text-align: center;
    width: 100px;
    border: 1px solid #d8d6de;
    border-radius: 0.5rem;
  }
}
</style>
