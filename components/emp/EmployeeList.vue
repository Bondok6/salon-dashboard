<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.empName.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
    stripe
  >
    <el-table-column type="index" width="50"> </el-table-column>
    <el-table-column label="Image" prop="profile">
      <template slot-scope="scope">
        <img
          :src="scope.row.profile"
          alt="profile"
          class="rounded-circle"
          width="40"
          height="40"
        />
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="empName"> </el-table-column>
    <el-table-column label="Phone" prop="phone"> </el-table-column>
    <el-table-column label="State" prop="state">
      <template slot-scope="scope">
        <span
          class="state"
          :class="scope.row.state === 'FREE' ? 'state--free' : 'state--busy'"
        >
          {{ scope.row.state }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Attendance" prop="attendent">
      <template slot-scope="scope">
        <span
          class="attendance"
          :class="
            scope.row.attendent === 'PRESENT'
              ? 'attendance--present'
              : 'attendance--absent'
          "
        >
          {{ scope.row.attendent }}
        </span>
      </template>
    </el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template slot-scope="scope">
        <img
          src="@/assets/images/emp/edit.png"
          style="width: 30px; cursor: pointer"
          @click="handleEdit(scope.$index, scope.row)"
        />

        <img
          src="@/assets/images/emp/delete.png"
          style="width: 30px; cursor: pointer"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleEdit(_, row) {
      this.$router.push(`/employees/edit/${row.id}`);
    },
    handleDelete(_, row) {
      this.$confirm(
        `Are you sure you want to delete ${row.empName}?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          const { id } = row;
          await this.$store.dispatch("emp/deleteEmployee", id);
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
};
</script>
