<template>
  <div
    class="f6 br4 pa2 bg-near-black light-silver w-100 mw6 shadow-2 container"
    tabindex="-1"
    @focusout="onFocus"
  >
    <h4 class="fw5 b lh-title">{{ content.title }}</h4>
    <ul class="list pa0 lh-copy">
      <li v-for="link in content.links" :key="link.title" class="pa0 ma0">
        <a
          class="light-silver link db fw5 dim no-underline underline-hover"
          :href="link.link"
          >{{ link.title }}</a
        >
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
