<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.customerName.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
    height="100%"
    stripe
    @current-change="handleCurrentChange"
  >
    <el-table-column label="ID" type="index" width="50"> </el-table-column>
    <el-table-column
      label="CUSTOMER NAME"
      prop="customerName"
    ></el-table-column>
    <el-table-column label="PHONE NUMBER" prop="phone"> </el-table-column>
    <el-table-column label="CITY" prop="city.nameEn"> </el-table-column>

    <el-table-column>
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template slot-scope="scope">
        <img
          src="@/assets/images/customers/action.png"
          style="cursor: pointer"
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
    handleCurrentChange(val) {
      const { id } = val;
      this.$router.push(`/customers/details/${id}`);
    },
  },
};
</script>
