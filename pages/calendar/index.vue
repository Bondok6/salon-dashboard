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

    <table class="table table-bordered">
      <thead>
        <tr align="center">
          <th scope="col">
            <img
              src="https://picsum.photos/200/300/"
              alt=""
              width="25"
              height="25"
            />
            <h6>Employee 1</h6>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
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
};
</script>

<style lang="scss" scoped></style>
