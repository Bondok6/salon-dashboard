<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <div class="header">
      <h2>
        <span>Reservations > </span>Reservation # {{ data.reservationNo }}
      </h2>
      <button class="btn btn--pink btn--details" @click="togglePopup">
        + Add Session
      </button>
    </div>

    <!-- Parent (Main) session -->
    <div class="content">
      <div class="content__left">
        <el-table :data="tableData" border>
          <el-table-column label="ID" type="index" align="center">
            1
          </el-table-column>

          <el-table-column
            prop="day"
            label="DATE & TIME"
            align="center"
          ></el-table-column>

          <el-table-column label="Employee" prop="empolyee" align="center">
            <template slot-scope="scope">
              <figure class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <img
                    :src="scope.row.empolyee.profile"
                    alt="employee"
                    class="rounded-circle"
                    width="30"
                    height="30"
                  />
                  <figcaption>{{ scope.row.empolyee.empName }}</figcaption>
                </div>
                <div>
                  <img
                    src="@/assets/images/reservations/edit.png"
                    alt="edit"
                    role="button"
                    @click="toggleEmpPopup(scope.row)"
                  />
                </div>
              </figure>
            </template>
          </el-table-column>

          <el-table-column label="STATE" prop="status" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
                @change="changeStatus(scope.row)"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="NOTE" align="center" width="80">
            <img
              src="@/assets/images/reservations/down-arrow.png"
              alt="down arrow"
              role="button"
              @click="showNote = !showNote"
            />
          </el-table-column>
        </el-table>
        <div v-if="showNote" class="note">
          <p>
            <span>Note</span>
            {{ data.clientNotes || "There are no notes" }}
          </p>
        </div>
      </div>

      <div class="content__right">
        <div class="heading">Order Day</div>
        <div class="info">{{ data.createdAt }}</div>
        <div class="heading">Customer Information</div>
        <div class="info">
          <h6>
            <span>Name</span>
            {{ data.firstName + " " + data.lastName }}
          </h6>
          <h6><span>Phone</span> {{ data.phone }}</h6>
          <h6><span>City</span> {{ data.city }}</h6>
        </div>
        <div class="heading">Name Of Service</div>
        <div class="info">{{ data.service.nameEn }}</div>
        <div class="heading">Number Of Sessions</div>
        <div class="info">{{ childrenNum }} / {{ data.service.numofsets }}</div>
        <div class="heading">Session Price</div>
        <div class="info">₪ {{ data.total }}</div>
      </div>
    </div>

    <!-- Children sessions -->
    <h2 class="children" v-if="childrenTableData.length">Sessions</h2>
    <div class="content" v-if="childrenTableData.length">
      <div class="content__left content__left--children">
        <el-table :data="childrenTableData" border>
          <el-table-column
            label="ID"
            type="index"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="day"
            label="DATE & TIME"
            align="center"
          ></el-table-column>

          <el-table-column label="Employee" prop="empolyee" align="center">
            <template slot-scope="scope">
              <figure class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <img
                    :src="scope.row.empolyee.profile"
                    alt="employee"
                    class="rounded-circle"
                    width="30"
                    height="30"
                  />
                  <figcaption>{{ scope.row.empolyee.empName }}</figcaption>
                </div>
                <div>
                  <img
                    src="@/assets/images/reservations/edit.png"
                    alt="edit"
                    role="button"
                    @click="toggleEmpPopup(scope.row)"
                  />
                </div>
              </figure>
            </template>
          </el-table-column>

          <el-table-column label="STATE" prop="status" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
                @change="changeStatus(scope.row)"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="Admin Note" prop="adminNotes" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- Add session Popup-->
    <uiPopupForm
      v-if="showPopup"
      :modalTrigger="showPopup"
      @update:modalTrigger="togglePopup"
    >
      <el-form
        :rules="formRules"
        :model="form"
        ref="form"
        class="p-3"
        style="width: 500px"
      >
        <el-form-item label="Date" prop="day">
          <el-date-picker
            v-model="form.day"
            type="date"
            placeholder="Select Date"
            @change="onDateChange"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Time" prop="slot">
          <el-select
            v-model="form.slot"
            placeholder="Select"
            :disabled="!form.day"
            style="width: 100%"
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

        <el-form-item label="Notes" prop="adminNotes">
          <el-input
            v-model="form.adminNotes"
            type="textarea"
            placeholder="Enter note"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>

      <button type="submit" class="popupBtn" @click.prevent="addSession">
        Add
      </button>
    </uiPopupForm>

    <!-- Select Employees -->
    <uiPopupForm
      v-if="showEmpPopup"
      :modalTrigger="showEmpPopup"
      @update:modalTrigger="toggleEmpPopup"
      class="text-center"
    >
      <el-select
        v-model="employee"
        filterable
        placeholder="select an employee"
        class="w-75 my-5"
        required
      >
        <el-option
          v-for="item in validEmployees"
          :key="item.id"
          :label="item.empName"
          :value="item.id"
        >
          <img
            :src="item.profile"
            width="25"
            height="25"
            class="rounded-circle mx-2"
          />
          <span>{{ item.empName }}</span>
        </el-option>
      </el-select>
      <button type="submit" class="popupBtn my-5" @click.prevent="editEmployee">
        Assign
      </button>
    </uiPopupForm>
  </section>
</template>

<script>
export default {
  async fetch() {
    const { id } = this.$route.params;
    const { data } = await this.$axios.get(`/reservations/${id}`);
    data.day = this.$moment(data.day).format("MMMM Do YYYY, h:mm a");
    data.createdAt = this.$moment(data.createdAt).format(
      "MMMM Do YYYY, h:mm a"
    );
    this.tableData.push(data);
    this.data = data;

    // Get num of childs (sessions)
    const response = await this.$axios.get(`/reservations?parent=${id}`);
    const { totalDocs } = response.data;
    this.childrenNum = totalDocs + 1;

    // Get Children (sessions)
    if (totalDocs > 0) {
      this.childrenTableData = response.data.docs;
      this.childrenTableData.forEach((item) => {
        item.day = this.$moment(item.day).format("MMMM Do YYYY, h:mm a");
        item.createdAt = this.$moment(item.createdAt).format(
          "MMMM Do YYYY, h:mm a"
        );
      });
    }

    // Fetch valid & free employees
    const employees = await this.$axios.get(
      "/users?state=FREE&status=VALID&roles=EMPLOYEE"
    );

    // extract id , profile, and empName from employees
    this.validEmployees = employees.data.map((employee) => {
      return {
        id: employee.id,
        profile: employee.profile,
        empName: employee.empName,
      };
    });
    console.log(this.data);
  },
  data() {
    return {
      tableData: [],
      childrenTableData: [],
      data: {},
      showNote: false,
      childrenNum: null,
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
      form: {
        day: "",
        slot: "",
        adminNotes: "",
      },
      formRules: {
        day: [{ required: true, message: "Please select day" }],
        slot: [{ required: true, message: "Please select time" }],
        adminNotes: [{ required: true, message: "Please enter note" }],
      },
      showPopup: false,
      showEmpPopup: false,
      validEmployees: [],
      employee: null,
      reservationId: null,
      availableTimes: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    toggleEmpPopup(row) {
      this.showEmpPopup = !this.showEmpPopup;
      this.reservationId = row.id;
    },
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    addSession() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            const { id } = this.$route.params;

            // convert day to 22022-08-16 then add T + slot + Z
            const day = this.$moment(this.form.day).format("YYYY-MM-DD");
            const slot = this.form.slot;
            const slotTime = this.$moment(slot, "h:mm a").format("HH:mm:ss");
            const slotDate = `${day}T${slotTime}Z`;
            this.form.slot = slotDate;
            this.form.day = slotDate;
            await this.$axios.post(`/reservations/${id}/chiled`, this.form);
            this.showPopup = false;
            this.$message.success("Session added successfully");
            window.location.reload();
          } catch (e) {
            this.$message.error("Error adding session");
          } finally {
            loading.close();
          }
        }
      });
    },
    async changeStatus(row) {
      const newStatus = row.status;
      const { id } = row;
      try {
        await this.$axios.patch(
          `/reservations/${id}/update?status=${newStatus}`
        );
        this.$message.success("Status updated successfully");
      } catch (e) {
        this.$message.error("Error updating status");
      }
    },
    async editEmployee() {
      if (!this.employee) {
        this.$message.error("Please select an employee");
        return;
      }
      const loading = this.$loading();
      try {
        const id = this.reservationId;
        await this.$axios.patch(`/reservations/${id}/update`, {
          empolyee: this.employee,
        });
        this.$message.success("Employee assigned successfully");
        this.showEmpPopup = false;
        window.location.reload();
      } catch (e) {
        this.$message.error("Error assigning employee");
      } finally {
        loading.close();
      }
    },
    generateSlots(start, end, duration) {
      const slots = [];
      const startTime = this.$moment(start);
      const endTime = this.$moment(end);
      const durationTime = this.$moment.duration(duration, "minutes");
      while (startTime.isBefore(endTime)) {
        slots.push(startTime.format("h:mm A"));
        startTime.add(durationTime);
      }
      return slots;
    },
    async onDateChange(date) {
      const [startTime, endTime] = await this.$store.dispatch(
        `workTimes/fetchWorkingHoursSpecificDay`,
        date
      );
      this.availableTimes = this.generateSlots(
        startTime,
        endTime,
        this.data.service.deuration
      );
    },
  },
};
</script>
