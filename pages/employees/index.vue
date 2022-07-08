<template>
  <section>
    <uiAddButton text="Employee" @click="goTo()" />

    <uiEmpty
      v-if="!employees.length"
      imgSrc="emp/no-emp.svg"
      caption="No employees have been added yet"
    />

    <empEmployeeList :tableData="employees" />
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("emp/fetchEmployees");
  },
  methods: {
    goTo() {
      this.$router.push("/employees/add");
    },
  },
  computed: {
    employees() {
      return this.$store.state.emp.employees;
    },
  },
};
</script>
