<template>
  <div
    v-click-outside="onClickOut"
    class="f6 br4 pt3 pb2 ph3 bg-near-black light-silver w-100 mw6 shadow-2 container"
    tabindex="-1"
  >
    <h4 class="fw7 b lh-title mv2">{{ content.title }}</h4>
    <ul class="list pa0 lh-copy mt0">
      <li v-for="link in content.links" :key="link.title" class="pa0 ma0">
        <a
          class="light-silver hover-green link db fw5 no-underline underline-hover"
          :href="link.link"
          target="_blank"
          rel="noopener noreferrer"
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
    onClickOut(e) {
      this.$store.dispatch('setUIState', { more: false })
    },
  },
}
</script>

<style lang="scss" scoped>
.container:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
</style>
