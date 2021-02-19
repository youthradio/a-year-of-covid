<template>
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    viewBox="0 0 42 42"
  >
    <circle cx="21" cy="21" r="21" fill="#00EBAB" />
    <template v-if="isPlaying">
      <path fill="#000" d="M14 11h5v19h-5zM23 11h5v19h-5z" />
    </template>
    <template v-else>
      <path d="M31 20.844l-14.766 8.525v-17.05L31 20.844z" fill="#000" />
    </template>
  </svg>
</template>

<script>
export default {
  props: {
    isPlaying: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.fade {
  animation: 0.5s ease-in-out 0.5s infinite alternate fade;
}
@keyframes fade {
  from {
    fill: #00ebab;
  }
  to {
    fill: rgba(white, 0.5);
  }
}
</style>
