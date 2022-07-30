<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Edit Working Days And Hours</h2>

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

    <button
      class="btn btn--pink btn--add mt-5"
      @click.prevent="updateWorkTimes"
    >
      Save
    </button>
    <button class="btn btn--white btn--add mt-5" @click.prevent="goTo()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  async mounted() {
    const data = await this.$store.dispatch("workTimes/getWorkTimes");
    data.forEach((work) => {
      work.startAt = this.$moment(work.startAt).format("HH:mm");
      work.endAt = this.$moment(work.endAt).format("HH:mm");
    });
    this.workTimes = data;
  },
  data() {
    return {
      workTimes: [],
    };
  },
  methods: {
    goTo() {
      this.$router.push("/work-times");
    },
    async updateWorkTimes() {
      // convert time to datetime format
      this.workTimes.forEach((work) => {
        work.startAt = this.$moment(work.startAt, "HH:mm").format();
        work.endAt = this.$moment(work.endAt, "HH:mm").format();
      });
      if (this.workTimes.length > 0) {
        const loading = this.$loading();
        try {
          await this.$store.dispatch(
            "workTimes/updateWorkTimes",
            this.workTimes
          );
          this.$message.success("Work Times updated successfully");
          this.$router.push("/work-times");
        } catch {
          this.$message.error("Work Times Update Failed");
        } finally {
          loading.close();
        }
      }
    },
  },
};
</script>
