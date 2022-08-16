<template>
  <section>
    <div class="text-center">
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a day"
        :picker-options="pickerOptions"
        @change="handleChange"
      >
      </el-date-picker>
    </div>

    <div class="employees-row">
      <div
        scope="col"
        v-for="emp in employees"
        :key="emp.id"
        :class="calendar.length < 3 ? 'w-50' : 'w-25'"
      >
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
      </div>
    </div>

    <div class="sessions">
      <div
        v-for="(cal, ind) in calendar"
        :key="ind"
        :class="calendar.length < 3 ? 'w-50' : 'w-25'"
        class="sessions--border"
      >
        <div v-for="c in cal" :key="c._id" align="center">
          <div
            class="session"
            :style="`background:${c.service.color}`"
            @click="goTo(c.directParent)"
            role="button"
          >
            <div class="session__data">
              <h4>Customer Name :</h4>
              <h4>
                {{ c.firstName + " " + c.lastName }}
              </h4>
            </div>
            <div class="session__data">
              <h4>Service Name :</h4>
              <h4>{{ c.service.nameEn }}</h4>
            </div>
            <div class="session__data">
              <h4>Service Time :</h4>
              <h4>{{ duration(c.slot, c.service.deuration) }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      date: new Date(),
    };
  },
  methods: {
    duration(slot, serviceDuration) {
      const start = this.$moment(slot);
      const end = this.$moment(slot).add(serviceDuration, "minutes");
      const startTime = start.format("h:mm A");
      const endTime = end.format("h:mm A");
      return `${startTime} - ${endTime}`;
    },
    handleChange(date) {
      this.$store.dispatch("calendar/fetchCalendar", date);
    },
    goTo(id) {
      this.$router.push(`/reservations/details/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.employees-row {
  display: flex;

  .employee {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    margin-top: 2rem;
    border: 1px solid #ccc;
    h6 {
      font-size: 1.4rem;
    }
  }
}

.sessions {
  display: flex;

  &--border {
    border: 1px solid #ccc;
  }

  .session {
    width: 90%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
    transition: 0.4s;

    .session__data {
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      align-items: center;

      h4:first-child {
        font-size: 1.4rem;
        color: #000;
      }

      h4:nth-child(2) {
        color: #fff;
      }
    }
  }
  .session:hover {
    transform: scale(1.1);
  }
}
</style>
