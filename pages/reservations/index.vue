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
        تأكيد
      </button>
    </uiPopupForm>

    <!-- Filter Popup -->
    <uiPopupForm
      v-if="showFilter"
      :modalTrigger="showFilter"
      @update:modalTrigger="toggleFilter"
    >
      <el-select
        v-model="statusInput"
        @change="statusFilter"
        placeholder="Select Status"
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

      <button type="submit" class="popupBtn" @click.prevent="filter">
        تأكيد
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
      @current-change="fetchReservations"
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
      statusInput: null,
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
    statusFilter() {
      this.toggleFilter();
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
