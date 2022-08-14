<template>
  <section>
    <nav class="customers_nav">
      <nuxt-link :to="`/notifications`" class="customers_nav--item"
        >notifications</nuxt-link
      >

      <nuxt-link
        :to="`/notifications/messages`"
        class="customers_nav--item active-link"
        >messages</nuxt-link
      >
    </nav>

    <section class="messages">
      <div class="message">
        <div class="message__date">
          {{ Date.now().toLocaleString() }}
        </div>
        <p class="message__body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ea,
          sunt tempora dolores expedita id.
        </p>
      </div>
    </section>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.messages {
  margin: 2rem;

  .message {
    border-radius: 5px;
    background-color: #fafafa;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;

    .message__date {
      font-size: 1.2rem;
      color: #949494;
      margin-bottom: 1rem;
    }

    .message__body {
      color: #3d3d3d;
      font-size: 1.4rem;
    }
  }
}
</style>
