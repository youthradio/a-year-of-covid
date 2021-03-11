<template>
  <div
    class="flex bg-near-black light-silver pv2 justify-center align-baseline"
  >
    <button
      class="icon-hover pointer f6 bn grow light-silver bg-near-black ph2 flex flex-column justify-between"
      @click.stop="toggleUIState('contributors')"
    >
      <peopleicon class="icon pv2" />
      <contributorstext class="text-size" />
    </button>
    <button
      class="icon-hover pointer f6 bn grow light-silver bg-near-black ph2 flex flex-column justify-between"
      @click.stop="toggleUIState('chat')"
    >
      <chaticon class="icon pv2" />
      <introtext class="text-size" />
    </button>
    <button
      class="icon-hover pointer f6 bn grow light-silver bg-near-black ph2 flex flex-column justify-between"
      @click.stop="toggleUIState('reactions')"
    >
      <reactionicon class="icon pv2" />
      <reactionstext class="text-size self-baseline" />
    </button>
    <button
      class="icon-hover pointer f6 bn grow light-silver bg-near-black ph2 flex flex-column justify-between"
      @click.stop="toggleUIState('credits')"
    >
      <creditsicon class="icon pv2" />
      <creditstext class="text-size self-baseline" />
    </button>
    <button
      class="icon-hover pointer f6 bn grow light-silver bg-near-black ph2 flex flex-column justify-between"
      @click.stop="toggleUIState('more')"
    >
      <moreicon class="icon pv2" />
      <moretext class="text-size self-baseline" />
    </button>
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
