<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <div class="header">
      <h2><span>Reservations > </span>Reservation #{{ id }}</h2>
      <button class="btn btn--pink btn--details">+ Add Session</button>
    </div>
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
                    @click="editEmployee(scope.row)"
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
            {{ tableData.clientNotes || "There are no notes" }}
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
        <div class="info">{{ children }} / {{ data.service.numofsets }}</div>
        <div class="heading">Session Price</div>
        <div class="info">$ {{ data.total }}</div>
      </div>
    </div>
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

    // Get num of childs
    const response = await this.$axios.get(`/reservations?parent=${id}`);
    const { totalDocs } = response.data;
    this.children = totalDocs > 0 ? totalDocs : 1;
  },
  data() {
    return {
      tableData: [],
      data: {},
      showNote: false,
      children: null,
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
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    editEmployee(row) {
      console.log(row);
    },
    changeStatus(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  .header {
    display: flex;
    align-items: center;

    h2 {
      color: #000;
      font-size: 1.6rem;
      padding: 0.5rem;

      span {
        color: #ea3162;
        font-size: 1.8rem;
      }
    }

    .btn {
      position: absolute;
      right: 1rem;
      top: 0;
      &--details {
        width: 15rem;
        padding: 1rem 0;
        font-size: 1.5rem;
      }
    }
  }
  .content {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    &__left {
      width: 75%;
    }

    &__right {
      width: 25%;
      border: 1px solid #ebe9f1;
      border-radius: 1rem;

      .heading {
        color: #ea3162;
        font-size: 1.7rem;
        font-weight: bold;
        background-color: #fafafa;
        padding: 0.5rem 1rem;
      }
      .info,
      .info h6 {
        font-size: 1.5rem;
        color: #9a9a9a;
        padding: 0.5rem 1rem;

        h6 span {
          font-size: 1.7rem;
          color: #000;
          padding-right: 1rem;
        }
      }
    }

    .note {
      padding: 0.5rem 1rem;
      background-color: #fafafa;
      border-radius: 1rem;
      span {
        color: #ea3162;
        font-size: 1.7rem;
        font-weight: bold;
        padding: 0.5rem 1rem;
      }

      p {
        font-size: 1.5rem;
        color: #9a9a9a;
        padding: 0.5rem 1rem;
      }
    }
  }
}
</style>
