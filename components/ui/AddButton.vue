<template>
  <button v-on="$listeners" type="button" class="btn btn--pink btn--add">
    <b> + </b>{{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
