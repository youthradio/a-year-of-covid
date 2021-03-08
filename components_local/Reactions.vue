<template>
  <div class="">
    <div
      class="f6 br4 pa2 bg-near-black light-silver mw5 shadow-2 container flex"
      @focusout="onFocus"
    >
      <span class="f5 db" @click="test('clap emoji')">👏</span>
      <span class="f5 db" @click="test('star emoji')">👏</span>
      <span class="f5 db" @click="test('washed emoji')">👏</span>
      <span class="f5 db" @click="test('cute emoji')">👏</span>
      <span class="f5 db" @click="test('emo emoji')">👏</span>
      <span class="f5 db" @click="test('cryin emoji')">👏</span>
    </div>
    <!-- Unfinished note, because tabs are defined in limited spaces, it's hard to make a space for the emojis that sit on a responive corner of the screen, so I'm more doing hacky positioning to simply getting it working for now -->
    <div ref="emojiSpace" class="reaction-space absolute w-100"></div>
  </div>
</template>

<script>
export default {
  props: {},
  mounted() {
    this.$el.focus()
  },
  methods: {
    test(emoji) {
      console.log('Recieved a click, emoji is ' + emoji)
      console.log(this.$refs.emojiSpace)
      const createEle = document.createElement('span')
      const createEmoji = document.createTextNode('😋')
      createEle.appendChild(createEmoji)
      this.$refs.emojiSpace.appendChild(createEle)

      // Replace with the animation api's onfinish function when animations are done
      setTimeout(function () {
        createEle.remove()
      }, 3000)
    },
    onFocus(e) {
      if (e.type === 'focusout') {
        this.$store.dispatch('toggleUIState', 'reactions')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
.reaction-space {
  left: 200%;
}
</style>
