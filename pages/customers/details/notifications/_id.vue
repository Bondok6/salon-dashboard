<template>
  <section>
    <div class="header">
      <h2>
        <span>Customers > </span
        >{{ customer.firstName + " " + customer.lastName }}
      </h2>
    </div>
    <nav class="customers_nav">
      <nuxt-link
        :to="`/customers/details/${customer.id}`"
        class="customers_nav--item"
        >info</nuxt-link
      >

      <nuxt-link
        :to="`/customers/details/reservations/${customer.id}`"
        class="customers_nav--item"
        >reservations</nuxt-link
      >

      <nuxt-link
        :to="`/customers/details/notifications/${customer.id}`"
        class="customers_nav--item active-link"
        >notifications</nuxt-link
      >

      <nuxt-link
        :to="`/customers/details/messages/${customer.id}`"
        class="customers_nav--item"
        >messages</nuxt-link
      >
    </nav>

    <div>
      <uiAddButton text="Notification" @click="goTo()" />
    </div>

    <section class="notification">
      <div class="notify">
        <div class="notify__head">
          <div class="notify__wrapper">
            <div>
              <img
                src="@/assets/images/customers/notify.png"
                alt="notify icon"
              />
            </div>
            <div class="notify__title">Title of Notification</div>
          </div>
          <div class="notify__date">{{ Date.now().toLocaleString() }}</div>
        </div>
        <p class="notify__body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ea,
          sunt tempora dolores expedita id.
        </p>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  async fetch({ store, route }) {
    const { id } = route.params;
    await store.dispatch("customers/fetchCustomer", id);
  },
  computed: {
    customer() {
      return this.$store.state.customers.customer;
    },
  },
  methods: {
    goTo() {
      this.$router.push("/customers/details/notifications/add");
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  margin: 8rem 2rem;

  .notify {
    border-radius: 5px;
    background-color: #fafafa;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    &__wrapper {
      display: flex;
      align-items: center;
    }
    &__title {
      color: #ea3162;
      font-size: 1.6rem;
      font-weight: 500;
      padding-left: 0.5rem;
    }

    &__date {
      color: #949494;
      font-size: 1.2rem;
      font-weight: 500;
    }

    &__body {
      color: #3d3d3d;
      font-size: 1.4rem;
    }
  }
}
</style>
