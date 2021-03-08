<template>
  <div class="flex bg-near-black light-silver pv1 justify-center">
    <div class="ph2">
      <button
        class="icon-hover pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('contributors')"
      >
        <peopleicon class="pv1 icon" />
        <contributorstext class="text-size pv1" />
      </button>
    </div>
    <div class="ph2">
      <button
        class="icon-hover pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('chat')"
      >
        <chaticon class="pv1 icon" />
        <chattext class="text-size pv1" />
      </button>
    </div>
    <div class="ph2">
      <button
        class="icon-hover pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('credits')"
      >
        <creditsicon class="pv1 icon" />
        <creditstext class="text-size pv1" />
      </button>
    </div>
    <div class="ph2">
      <button
        class="icon-hover pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('more')"
      >
        <moreicon class="pv1 icon" />
        <moretext class="text-size pv1" />
      </button>
    </div>
  </div>
</template>

<script>
import * as Icons from './Icons'
export default {
  components: { ...Icons },
  methods: {
    toggleUIState(state) {
      this.$store.dispatch('toggleUIState', state)
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/variables';

.text-size {
  height: 0.5rem;
}

.icon {
  height: 1.3rem;
}

.icon-hover:hover /deep/ .inner-path {
  stroke: $green;
}
.icon-hover /deep/ .inner-path {
  stroke: $silver;
}
button:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
</style>
