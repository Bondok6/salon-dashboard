<template>
  <div>
    <header id="header">
      <defaultNavbar />
    </header>

    <aside id="sidebar">
      <img src="@/assets/images/auth/logo.png" alt="logo" class="logo" />
      <defaultSidebar />
    </aside>

    <main id="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {};
</script>
