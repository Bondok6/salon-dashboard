<template>
  <section>
    <div class="text-center">
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a day"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>

    <table class="table table-bordered mt-2">
      <thead>
        <tr>
          <th scope="col" v-for="emp in employees" :key="emp.id">
            <div class="employee">
              <img
                :src="emp.profile"
                alt="profile"
                class="rounded-circle"
                width="30"
                height="30"
              />
              <h6>{{ emp.empName }}</h6>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cal, ind) in calendar" :key="ind">
          <td v-for="c in cal" :key="c._id" align="center">
            <div class="session" :style="`background:${c.service.color}`">
              <h6>{{ c.service.nameEn }}</h6>
              <p>{{ duration(c.slot, c.service.deuration) }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("calendar/fetchCalendar");
  },
  computed: {
    employees() {
      return this.$store.state.calendar.employees;
    },
    calendar() {
      return this.$store.state.calendar.calendar;
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      date: "",
    };
  },
  methods: {
    duration(slot, serviceDuration) {
      const start = this.$moment(slot.start);
      const end = this.$moment(slot.start).add(serviceDuration, "minutes");
      // formate Am/Pm
      const startTime = start.format("h:mm A");
      const endTime = end.format("h:mm A");
      return `${startTime} - ${endTime}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.employee {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h6 {
    font-size: 1.4rem;
  }
}

.session {
  width: 180px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h6 {
    font-size: 1.4rem;
    font-weight: bold;
  }
  p {
    font-size: 1.2rem;
    font-weight: 400;
  }
}
</style>
