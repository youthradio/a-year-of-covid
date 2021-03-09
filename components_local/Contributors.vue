<template>
  <div
    class="f6 br4 pv2 ph3 bg-near-black light-silver w-100 mw6 shadow-2 container"
    tabindex="-1"
    @focusout="onFocus"
  >
    <span class="fw7">Contributors</span>
    <ul class="list pa0">
      <li
        v-for="participant in content"
        :key="participant.name"
        class="pa0 mh0 mv2 flex"
      >
        <div class="grow-large">
          <img class="br-100 bn h2 w2 dib" :src="participant.image" />
        </div>
        <div class="mh2">
          <div class="fw7">{{ participant.name }}</div>
          <div class="fw5">
            {{ participant.school }} ({{ participant.location }})
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$el.focus()
  },
  methods: {
    onFocus(e) {
      if (e.type === 'focusout') {
        // this.$store.dispatch('toggleUIState', 'contributors')
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
