<template>
  <section>
    <nav class="customers_nav">
      <nuxt-link :to="`/notifications`" class="customers_nav--item active-link"
        >notifications</nuxt-link
      >

      <nuxt-link :to="`/notifications/messages`" class="customers_nav--item"
        >messages</nuxt-link
      >
    </nav>

    <div>
      <uiAddButton text="Notification" @click="goTo()" />
    </div>

    <uiEmpty
      v-if="!notifications.length"
      imgSrc="notifications/no-data.png"
      caption="No notifications have been added yet."
    />

    <section class="notification">
      <div class="notify" v-for="notify in notifications" :key="notify.id">
        <div class="notify__head">
          <div class="notify__wrapper">
            <div>
              <img
                src="@/assets/images/customers/notify.png"
                alt="notify icon"
              />
            </div>
            <div class="notify__title">{{ notify.titleEn }}</div>
          </div>
          <div class="notify__date">{{ dateFormat(notify.createdAt) }}</div>
        </div>
        <p class="notify__body">
          {{ notify.bodyEn }}
        </p>
      </div>
    </section>

    <!-- Pagination -->
    <el-pagination
      class="m-5"
      v-if="totalPages > 1"
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      @current-change="getNotification"
      :total="totalPages * 10"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  async mounted() {
    await this.getNotification();
  },
  methods: {
    goTo() {
      this.$router.push("/notifications/add");
    },
    async getNotification() {
      let params = { page: 1, limit: 5 };
      const response = await this.$axios.get("/notification", { params });
      const { data } = response;
      this.notifications = data.docs;
      this.totalPages = data.totalPages;
      this.page = data.page;
    },
    dateFormat(date) {
      return this.$moment(date).format("MMM DD, YYYY hh:mm a");
    },
  },
  data() {
    return {
      notifications: [],
      totalPages: 1,
      page: 1,
    };
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
