<template>
  <section>
    <!-- Today -->
    <span class="fs-4 mx-5">{{ today }}</span>

    <!-- Filters -->
    <button class="filterBtn" @click="toggleCalender">
      <img src="@/assets/images/reservations/date-filter.png" alt="filter" />
    </button>
    <button class="filterBtn" @click="toggleFilter">
      <img src="@/assets/images/reservations/oreder-filter.png" alt="filter" />
    </button>

    <!-- Calender Popup-->
    <uiPopupForm
      v-if="showCalender"
      :modalTrigger="showCalender"
      @update:modalTrigger="toggleCalender"
    >
      <el-calendar v-model="dateInput" class="calender"> </el-calendar>
      <button type="submit" class="popupBtn" @click.prevent="dateFilter">
        Filter
      </button>
    </uiPopupForm>

    <!-- Filter Popup -->
    <uiPopupForm
      v-if="showFilter"
      :modalTrigger="showFilter"
      @update:modalTrigger="toggleFilter"
    >
      <el-form
        :rules="formRules"
        :model="form"
        ref="form"
        class="p-3"
        style="width: 500px"
      >
        <el-form-item label="Status" prop="status">
          <el-select
            v-model="form.status"
            @change="statusFilter"
            placeholder="Select Status"
            class="w-100"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="text-center"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="From" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="Pick a day"
            class="w-100"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="To" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="Pick a day"
            class="w-100"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <button type="submit" class="popupBtn" @click.prevent="statusFilter">
        Filter
      </button>
    </uiPopupForm>

    <!-- Add Button -->
    <uiAddButton text="Reservation" @click="goTo()" />

    <!-- No Reservations -->
    <uiEmpty
      v-if="!reservations.length"
      imgSrc="reservations/no-reservations.png"
      caption="No reservations have been added yet."
    />

    <!-- Reservations -->
    <reservationsList :tableData="reservations" class="my-2" />

    <!-- Pagination -->
    <el-pagination
      class="m-5"
      v-if="totalPages > 1"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="chooseFilter"
      :total="totalPages * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      totalPages: 1,
      reservations: [],
      showCalender: false,
      showFilter: false,
      dateInput: null,
      form: {
        status: null,
        startDate: null,
        endDate: null,
      },
      formRules: {
        status: [{ required: true, message: "Please select a status" }],
        startDate: [{ required: true, message: "Please pick a start date" }],
        endDate: [{ required: true, message: "Please pick an end date" }],
      },
      statusOptions: [
        {
          value: "ACCEPTED",
          label: "Accepted",
        },
        {
          value: "PROCCESSING",
          label: "Processing",
        },
        {
          value: "DONE",
          label: "Done",
        },
        {
          value: "CANCELLED",
          label: "Cancelled",
        },
        {
          value: "REJECTED",
          label: "Rejected",
        },
      ],
      filterType: "",
    };
  },
  async mounted() {
    await this.fetchReservations();
  },
  methods: {
    goTo() {
      this.$router.push("/reservations/add");
    },
    async fetchReservations() {
      let params = { page: this.page, limit: 5 };
      const response = await this.$axios.$get("/reservations", { params });
      this.reservations = await response.docs;
      this.totalPages = await response.totalPages;
      this.page = await response.page;
    },
    toggleCalender() {
      this.showCalender = !this.showCalender;
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    dateFilter() {
      this.toggleCalender();
    },
    async filterByStatus() {
      let params = {
        page: this.page,
        limit: 5,
        status: this.form.status,
        startDate: this.form.startDate.toISOString(),
        endDate: this.form.endDate.toISOString(),
      };
      const response = await this.$axios.$get("/reservations", {
        params,
      });
      this.reservations = await response.docs;
      this.totalPages = await response.totalPages;
      this.page = await response.page;
    },
    statusFilter() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            await this.filterByStatus();
            this.toggleFilter();
            this.filterType = "status";
          } catch (error) {
            this.$message.error("Something went wrong");
          } finally {
            loading.close();
          }
        }
      });
    },
    async chooseFilter() {
      if (this.filterType == "status") {
        await this.filterByStatus();
      } else {
        await this.fetchReservations();
      }
    },
  },
  computed: {
    today() {
      return this.$moment().format("MMM DD. YYYY");
    },
  },
};
</script>

<style lang="scss" scoped>
.filterBtn {
  border: none;
  background: none;
  transition: 0.6s;
}
.filterBtn:hover {
  transform: scale(1.1);
}
.el-pagination {
  float: right;
}
</style>
