<template>
  <div class="flex bg-near-black light-silver pv3 justify-center">
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('contributors')"
      >
        <span>Participants</span>
      </button>
    </div>
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('chat')"
      >
        <span>Chat</span>
      </button>
    </div>
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('reactions')"
      >
        <span>Reactions</span>
      </button>
    </div>
    <div class="ph2">
      <button
        class="pointer f6 bn grow ph2 pv2 mb2 dib light-silver bg-near-black"
        @click.prevent="toggleUIState('credits')"
      >
        <span>Credits</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleUIState(state) {
      this.$store.dispatch('toggleUIState', state)
    },
  },
}
</script>

<style></style>
