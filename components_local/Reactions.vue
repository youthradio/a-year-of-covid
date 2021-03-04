<template>
  <div class="">
    <div
      class="f6 br4 pa2 bg-near-black light-silver mw5 shadow-2 container flex"
      @focusout="onFocus"
    >
      <span class="f5 db">👏</span>
      <span class="f5 db">👏</span>
      <span class="f5 db">👏</span>
      <span class="f5 db">👏</span>
      <span class="f5 db">👏</span>
      <span class="f5 db">👏</span>
    </div>
    <!-- Unfinished note, because tabs are defined in limited spaces, it's hard to make a space for the emojis that sit on a responive corner of the screen, so I'm more doing hacky positioning to simply getting it working for now -->
    <div class="reaction-space absolute w-100">Test</div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$el.focus()
  },
  methods: {
    onFocus(e) {
      if (e.type === 'focusout') {
        this.$store.dispatch('toggleUIState', 'reactions')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
.reaction-space {
  left: 90%;
}
</style>
