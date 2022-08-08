<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Reservation</h2>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <div class="d-flex flex-wrap gap-5 mb-4">
        <div class="d-flex flex-wrap gap-2">
          <el-form-item
            label="First Name"
            prop="firstName"
            style="width: 250px"
          >
            <el-input v-model="form.firstName"></el-input>
          </el-form-item>

          <el-form-item label="Last Name" prop="lastName" style="width: 250px">
            <el-input v-model="form.lastName"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="Phone" prop="phone" style="width: 500px">
          <el-input
            type="number"
            v-model="form.phone"
            placeholder="97241061234"
            oninput="if(this.value.length>11) this.value=this.value.slice(0,11)"
          >
          </el-input>
        </el-form-item>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4">
        <el-form-item label="City" prop="city">
          <el-select
            v-model="form.city"
            placeholder="Select"
            style="width: 500px"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-select
            v-model="form.gender"
            placeholder="Select"
            style="width: 500px"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4">
        <el-form-item label="Age" prop="age" style="width: 500px">
          <el-input type="number" v-model="form.age"> </el-input>
        </el-form-item>

        <el-form-item label="service" prop="service">
          <el-select
            v-model="form.service"
            placeholder="Select"
            style="width: 500px"
            @change="onServiceChange"
          >
            <el-option
              v-for="item in serviceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="d-flex flex-wrap gap-5 mb-4 w-100">
        <el-form-item label="Date" prop="day" style="width: 500px">
          <el-date-picker
            v-model="form.day"
            type="date"
            placeholder="Select Date"
            style="width: 500px"
            @change="onDateChange"
            :disabled="!form.service"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Time" prop="slot">
          <el-select
            v-model="form.slot"
            placeholder="Select"
            style="width: 500px"
            :disabled="!form.day"
          >
            <el-option
              v-for="(item, index) in availableTimes"
              :key="index"
              :label="item"
              :value="item"
              class="text-center"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="createReservation()">
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
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        gender: "",
        age: "",
        service: "",
        day: "",
        slot: "",
      },
      formRules: {
        firstName: [{ required: true, message: "Please input first name" }],
        lastName: [{ required: true, message: "Please input last name" }],
        phone: [{ required: true, message: "Please input phone number" }],
        city: [{ required: true, message: "Please select city" }],
        gender: [{ required: true, message: "Please select gender" }],
        age: [{ required: true, message: "Please input age" }],
        service: [{ required: true, message: "Please select service" }],
        day: [{ required: true, message: "Please select date" }],
        slot: [{ required: true, message: "Please select time" }],
      },
      cityOptions: [],
      genderOptions: [
        {
          label: "Male",
          value: "MALE",
        },
        {
          label: "Female",
          value: "FEMALE",
        },
      ],
      serviceOptions: [],
      availableTimes: [],
      duration: null,
    };
  },
  async mounted() {
    // fetch services
    await this.$store.dispatch("services/fetchServices");
    const services = this.$store.state.services.services;
    this.serviceOptions = services.map((service) => {
      return {
        label: service.nameEn,
        value: service.id,
      };
    });

    // fetch cities
    await this.$store.dispatch("cities/fetchCities");
    const cities = this.$store.state.cities.cities;
    this.cityOptions = cities.map((city) => {
      return {
        label: city.nameEn,
        value: city.id,
      };
    });
  },
  methods: {
    generateSlots(start, end, duration) {
      // 02:30 Am - 03:30 Am
      let startTime = this.$moment(start, "hh:mm A");
      let endTime = this.$moment(end, "hh:mm A").add(1, "days");
      let slots = [];
      while (startTime < endTime) {
        slots.push(startTime.format("hh:mm A"));
        startTime.add(duration, "minutes");
      }
      return slots;
    },
    onServiceChange(value) {
      const service = this.$store.state.services.services.find(
        (service) => service.id === value
      );
      this.duration = service.deuration;
    },
    async onDateChange(date) {
      const [startTime, endTime] = await this.$store.dispatch(
        `workTimes/fetchWorkingHoursSpecificDay`,
        date
      );
      this.availableTimes = this.generateSlots(
        startTime,
        endTime,
        this.duration
      );
    },
    async checkSlotAvailability(slot, serviceId, day) {
      const { data } = await this.$axios.get(
        `/reservations/${slot}/${serviceId}/${day}/check`
      );
      return data.statusCode === 202 ? true : false;
    },
    createReservation() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          const date = this.$moment(this.form.day, "YYYY-MM-DD");
          const time = this.$moment(this.form.slot, "HH:mm");
          const dateTime =
            date.format("YYYY-MM-DD") + " " + time.format("HH:mm");
          const dateTimeIso = new Date(dateTime).toISOString();

          try {
            const newReservation = {
              ...this.form,
              service: {
                id: this.form.service,
              },
              age: parseInt(this.form.age),
              day: this.form.day.toISOString(),
              slot: dateTimeIso,
            };

            const available = await this.checkSlotAvailability(
              newReservation.slot,
              newReservation.service.id,
              newReservation.day
            );

            if (!available) {
              this.$message.error(
                "this slot (Time) is not available, please select another one"
              );
              return;
            }

            await this.$axios.post("/reservations", newReservation);
            this.$message.success("Reservation Created Successfully");
            this.$router.push("/reservations");
          } catch (error) {
            this.$message.error("Reservation Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
    goTo() {
      this.$router.push("/reservations");
    },
  },
};
</script>
