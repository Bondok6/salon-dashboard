<template>
  <el-table
    :data="tableData"
    class="table-striped text-center"
    border
    :cell-style="cellStyle"
    @current-change="handleCurrentChange"
  >
    <el-table-column label="ID" type="index" align="center"> </el-table-column>

    <el-table-column label="Customer Name" prop="employee" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.firstName + " " + scope.row.lastName }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Service Name"
      prop="service.nameEn"
      align="center"
    ></el-table-column>

    <el-table-column label="Employee" prop="empolyee" align="center">
      <template slot-scope="scope">
        <figure class="mx-5 d-flex gap-2 align-items-center">
          <img
            :src="scope.row.empolyee.profile"
            alt="employee"
            class="rounded-circle"
            width="30"
            height="30"
          />
          <figcaption>{{ scope.row.empolyee.empName }}</figcaption>
        </figure>
      </template>
    </el-table-column>

    <el-table-column label="State" prop="status" align="center">
      <template slot-scope="scope">
        <span class="status">
          {{ scope.row.status }}
        </span>
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
    cellStyle({ row, _, columnIndex }) {
      if (row.status === "ACCEPTED" && columnIndex === 4)
        return { color: "#00CFE8" };
      if (row.status === "PROCESSING" && columnIndex === 4)
        return { color: "#FFCA00" };
      if (row.status === "DONE" && columnIndex === 4)
        return { color: "#28C76F" };
      if (row.status === "CANCELED" && columnIndex === 4)
        return { color: "#FF8B9E" };
      if (row.status === "REJECTED" && columnIndex === 4)
        return { color: "#ff0000" };
      return "";
    },
    handleCurrentChange(val) {
      const { id } = val;
      this.$router.push(`/reservations/details/${id}`);
    },
  },
};
</script>

<style scoped>
.status {
  font-weight: bold;
}
</style>
