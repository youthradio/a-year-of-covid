<template>
  <div
    class="f6 br4 pa2 bg-near-black light-silver mw5 shadow-2 container flex"
    tabindex="-1"
    @focusout="onFocus"
  >
    <span class="f5 db">👏</span>
    <span class="f5 db">👏</span>
    <span class="f5 db">👏</span>
    <span class="f5 db">👏</span>
    <span class="f5 db">👏</span>
    <span class="f5 db">👏</span>
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
</style>
