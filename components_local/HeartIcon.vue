<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.9 0 40 34" width="25">
      <path
        d="M9.6 2.2c3.8-.7 7 .5 9.4 3.8.4.6.5.6.9 0 3.2-4.5 9.2-5.3 13.4-1.9 4.5 3.7 4.8 10.8.7 14.8-1.6 1.6-3.4 3-5 4.5-3 2.6-5.9 5.2-8.9 7.8-1.3 1.1-1.3 1.2-2.5-.1-3.9-3.8-7.8-7.6-11.7-11.3-1.5-1.4-2.7-2.9-3.3-4.8-.3-1-.4-2.1-.5-2.9C2 7.1 5.2 3 9.6 2.2z"
        :fill="hasLiked ? '#00ebab' : 'none'"
        stroke="#000"
        stroke-width="4"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    hasLiked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>

<style></style>
