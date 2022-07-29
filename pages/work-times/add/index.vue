<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Working Days And Hours</h2>

    <section class="worktimes container">
      <div class="row gap-4 my-5 mx-2" v-for="work in workTimes" :key="work.id">
        <div class="col-md-3 wrapper">
          <div class="key">{{ work.day }}</div>
        </div>
        <div class="col-md-8 wrapper">
          <div class="state">
            <el-switch
              v-model="work.state"
              active-color="#EA3162"
              inactive-color="#C0C0C0"
              active-value="OPEN"
              inactive-value="CLOSE"
            >
            </el-switch>
            {{ work.state }}
          </div>
          <div class="times align-items-center" v-if="work.state === 'OPEN'">
            <el-time-select
              placeholder="Start time"
              v-model="work.startAt"
              :picker-options="{
                start: '01:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
            <div>TO</div>
            <el-time-select
              placeholder="End time"
              v-model="work.endAt"
              :picker-options="{
                start: '01:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </div>
        </div>
      </div>
    </section>

    <button class="btn btn--pink btn--add mt-5" @click.prevent="addWorkTimes">
      Save
    </button>
    <button class="btn btn--white btn--add mt-5" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      workTimes: [
        {
          day: "SUNDAY",
        },
        {
          day: "MONDAY",
        },
        {
          day: "TUESDAY",
        },
        {
          day: "WEDNESDAY",
        },
        {
          day: "THURSDAY",
        },
        {
          day: "FRIDAY",
        },
        {
          day: "SATURDAY",
        },
      ],
    };
  },
  methods: {
    goTo() {
      this.$router.push("/work-times");
    },
    async addWorkTimes() {
      this.workTimes.forEach((work) => {
        if (work.startAt == "Invalid date") delete work.startAt;
        if (work.endAt == "Invalid date") delete work.endAt;
        if (work.startAt)
          work.startAt = this.$moment(work.startAt, "HH:mm").format();
        if (work.endAt) work.endAt = this.$moment(work.endAt, "HH:mm").format();

        return;
      });

      const loading = this.$loading();
      try {
        await this.$store.dispatch("workTimes/addWorkTimes", this.workTimes);
        this.$message.success("Work Times added successfully");
        this.$router.push("/work-times");
      } catch {
        this.$message.error("Work Times Add Failed");
      } finally {
        loading.close();
      }
    },
  },
};
</script>
