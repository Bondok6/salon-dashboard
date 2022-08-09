export const state = () => ({
  customers: [],
  customer: {},
  customerReservations: [],
});

// Mutations
export const mutations = {
  setCustomers(state, customers) {
    state.customers = customers;
  },
  setCustomer(state, customer) {
    state.customer = customer;
  },
};

// Actions
export const actions = {
  async fetchCustomers({ commit }) {
    const customers = await this.$axios.$get("/users?roles=CLIENT");
    customers.forEach((customer) => {
      customer.customerName = customer.firstName + " " + customer.lastName;
    });
    commit("setCustomers", customers);
  },
  async fetchCustomer({ commit }, id) {
    const customer = await this.$axios.$get(`/users/${id}`);
    commit("setCustomer", customer);
  },
};
