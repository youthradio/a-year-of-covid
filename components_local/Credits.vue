<template>
  <div
    class="f6 br4 pt3 pb2 ph3 bg-near-black light-silver w-100 mw6 shadow-2 container"
    tabindex="-1"
    @focusout="onFocus"
  >
    <h4 class="fw7 b lh-title mv1">Credits</h4>

    <ul class="list pa0 lh-copy ma0">
      <li v-for="credit in content.list" :key="credit.title" class="pa0 ma0">
        <span class="fw7">{{ credit.title }}</span
        ><span class="fw5"> {{ credit.names }}</span>
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
        this.$store.dispatch('setUIState', { credits: false })
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
