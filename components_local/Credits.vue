<template>
  <div
    class="f6 br4 pa2 bg-near-black light-silver mw5 shadow-2 container"
    @focusout="onFocus"
  >
    <span class="fw5">Credits</span>
    <ul class="list pa0">
      <li v-for="credit in content.list" :key="credit.title" class="pa0 ma0">
        <span class="fw5">{{ credit.title }}</span
        ><span class="fw1"> {{ credit.names }}</span>
      </li>
    </ul>
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
        this.$store.dispatch('toggleUIState', 'credits')
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
