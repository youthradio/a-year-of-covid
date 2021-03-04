<template>
  <div class="flex bg-near-black light-silver pv3 justify-center">
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('contributors')"
      >
        <peopleicon />

        <span>Participants</span>
      </button>
    </div>
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('chat')"
      >
        <chaticon />
        <span>Chat</span>
      </button>
    </div>
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('reactions')"
      >
        <reactionsicon />

        <span>Reactions</span>
      </button>
    </div>
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('credits')"
      >
        <creditsicon />
        <span>Credits</span>
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

<style></style>
