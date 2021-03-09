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

      // generate a random size for randomized properties (clamp it below a specific size soon)
      const randoSize = Math.floor(Math.random() * 40 + 5)
      const dice = Math.random() > 0.5 ? 1 : 0
      console.log(dice)
      // create the element itself
      const createEle = document.createElement('span')
      const createEmoji = document.createTextNode('😋')
      createEle.style.fontSize = `${randoSize}px`
      createEle.classList.add('emoji')
      createEle.appendChild(createEmoji)
      this.$refs.emojiSpace.appendChild(createEle)

      // offset within the parent space
      if (dice === 1) {
        createEle.style.right = `${randoSize}px`
        createEle.style.left = `${randoSize}px / 2`
        createEle.style.top = `${randoSize}px * 1.5`
      } else if (dice === 0) {
        createEle.style.left = `${randoSize}px`
        createEle.style.right = `${randoSize}px / 2`
        createEle.style.top = `${randoSize}px`
      }

      const animation = createEle.animate(
        [
          {
            opacity: 1,
          },
          {
            transform: 'translate(0px,-300px)',
            opacity: 0,
            textSize: `${randoSize}px`,
          },
        ],
        {
          duration: 3000,
          easing: 'cubic-bezier(0, .96, .46, 0.07)',
          // Delay every particle with a random value from 0ms to 200ms
          delay: Math.random() * 200,
        }
      )

      animation.onfinish = () => {
        createEle.remove()
      }

      // Replace with the animation api's onfinish function when animations are done
      setTimeout(function () {
        // createEle.remove()
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

// does the style need to be scoped? I can't target new elements for some
reason...

<style lang="scss">
.container:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
.reaction-space {
  left: 200%;
  * {
    position: absolute;
    opacity: 0;
  }
}
</style>
