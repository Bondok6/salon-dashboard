<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.userName.toLowerCase().includes(search.toLowerCase())
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
    <el-table-column label="Name" prop="userName"> </el-table-column>
    <el-table-column label="Phone" prop="phone"> </el-table-column>
    <el-table-column label="Role" prop="role"> </el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template slot-scope="scope">
        <img
          src="@/assets/images/emp/edit.png"
          class="mx-2"
          role="button"
          @click="handleEdit(scope.$index, scope.row)"
        />

        <img
          src="@/assets/images/emp/delete.png"
          class="mx-2"
          role="button"
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
      this.$router.push(`/admins/edit/${row.id}`);
    },
    handleDelete(_, row) {
      this.$confirm(
        `Are you sure you want to delete ${row.userName}?`,
        "Warning",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          const { id } = row;
          await this.$store.dispatch("admin/deleteUser", id);
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
