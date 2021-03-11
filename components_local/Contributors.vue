<template>
  <div
    v-click-outside="onClickOut"
    class="f6 br4 pt3 pb2 ph3 bg-near-black light-silver w-100 mw6 shadow-2 container"
    tabindex="-1"
  >
    <span class="fw7">Contributors</span>
    <ul class="list pa0">
      <li
        v-for="participant in content"
        :key="participant.name"
        class="pa0 mh0 mv2 flex"
      >
        <div class="grow-large">
          <img class="br-100 bn h2 w2 dib dn" :src="participant.image" />
        </div>
        <div class="ml1">
          <div class="fw7">{{ participant.name }}</div>
          <div
            class="fw5"
            v-html="
              `${participant.school.label.trim()} <br class='dib dn-ns'> (${participant.location.trim()})`
            "
          />
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
    onClickOut(e) {
      this.$store.dispatch('setUIState', { contributors: false })
    },
  },
}
</script>

<style lang="scss" scoped>
.container:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
</style>
