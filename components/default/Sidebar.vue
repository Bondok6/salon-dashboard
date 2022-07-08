<template>
  <div>
    <nav class="sidebar-nav">
      <h4 class="sidebar-nav__title">Booking System</h4>
      <ul class="sidebar-nav__links">
        <li class="sidebar-nav__item active">
          <img
            src="@/assets/images/sidebar/booking/Statistics.svg"
            alt="statistics-icon"
          />
          <router-link to="/" class="sidebar-nav__link">Statistics</router-link>
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/booking/Calendar.svg"
            alt="calendar-icon"
          />
          <router-link to="/calendar" class="sidebar-nav__link"
            >Calendar</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/booking/Bag.png"
            alt="reservation-icon"
          />
          <router-link to="/reservations" class="sidebar-nav__link"
            >Reservations</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/booking/customers.svg"
            alt="employees-icon"
          />
          <router-link to="/employees" class="sidebar-nav__link"
            >Employees</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/booking/profile-1.png"
            alt="customers-icon"
          />
          <router-link to="/customers" class="sidebar-nav__link"
            >Customers</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/booking/Notification.svg"
            alt="notification-icon"
          />
          <router-link to="/notifications" class="sidebar-nav__link"
            >Notifications</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/booking/Clock.png"
            alt="work-time-icon"
          />
          <router-link to="/work-times" class="sidebar-nav__link"
            >Work Times</router-link
          >
        </li>
      </ul>
    </nav>

    <nav class="sidebar-nav">
      <h4 class="sidebar-nav__title">Dashboard</h4>
      <ul class="sidebar-nav__links">
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/dashboard/icon-4.png"
            alt="advertisment-icon"
          />
          <router-link to="/ads" class="sidebar-nav__link"
            >Advertisements</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/dashboard/services.svg"
            alt="services-icon"
          />
          <router-link to="/services-offers" class="sidebar-nav__link"
            >Services & Offers</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/dashboard/file.svg"
            alt="blogs-icon"
          />
          <router-link to="/blogs" class="sidebar-nav__link">Blogs</router-link>
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/dashboard/icon-3.png"
            alt="videos-icon"
          />
          <router-link to="/videos" class="sidebar-nav__link"
            >Videos</router-link
          >
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/dashboard/about.svg"
            alt="about-icon"
          />
          <router-link to="/about" class="sidebar-nav__link"
            >About Us</router-link
          >
        </li>
      </ul>
    </nav>

    <nav class="sidebar-nav">
      <h4 class="sidebar-nav__title">Settings</h4>
      <ul class="sidebar-nav__links">
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/settings/world.png"
            alt="world-icon"
          />
          <router-link to="/cites" class="sidebar-nav__link">Cites</router-link>
        </li>
        <li class="sidebar-nav__item">
          <img
            src="@/assets/images/sidebar/settings/admins.png"
            alt="admins-icon"
          />
          <router-link to="/admins" class="sidebar-nav__link"
            >Admins</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  mounted() {
    const navItems = document.querySelectorAll(".sidebar-nav__item");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navItems.forEach((item) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
      });
    });
  },
};
</script>

<style></style>
