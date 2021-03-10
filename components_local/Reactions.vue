<template>
  <div class="relative">
    <div
      class="f6 br4 pt3 pb2 ph3 bg-near-black light-silver mw6 shadow-2 container"
      @focusout="onFocus"
    >
      <div class="f5 mw5 pv2">
        How would you describe your first year of virtual learning?
      </div>
      <div class="flex justify-between w-100">
        <span
          v-for="(emoji, index) in content"
          :key="index"
          class="f3 dib pointer ph1 grow-large"
          @click="test(emoji)"
          >{{ emoji }}</span
        >
      </div>
    </div>
    <!-- Unfinished note, because tabs are defined in limited spaces, it's hard to make a space for the emojis that sit on a responive corner of the screen, so I'm more doing hacky positioning to simply getting it working for now -->
    <div
      ref="emojiSpace"
      class="reaction-space absolute w-100 left-0 bottom-0"
    ></div>
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
    test(emoji) {
      // console.log('Recieved a click, emoji is ' + emoji)
      // console.log(this.$refs.emojiSpace)

      // generate a random size for randomized properties (clamp a fixed bottom size soon)
      const randoSize = Math.floor(Math.random() * 90 + 5)
      const dice = Math.random() > 0.5 ? 1 : 0
      // console.log(dice)
      // create the element itself
      const createEle = document.createElement('span')
      const createEmoji = document.createTextNode(emoji)
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

      // used as the main animation
      const leadAnimation = createEle.animate(
        [
          {
            opacity: 1,
          },
          {
            transform: 'translate(0px,-100vh)',
            opacity: 0,
            textSize: `${randoSize}px`,
            // maybe its worth linking opacity to its own animation so it wouldnt apply to the easing
          },
        ],
        {
          duration: 1500,
          easing: 'cubic-bezier(0, .96, .46, 0.07)',
          // delay emoji rendering from 0 to 200 milliseconds
          delay: Math.random() * 200,
        }
      )
      // wiggly
      createEle.animate(
        [
          {
            transform: [`translateX(-5px)`],
          },
          {
            transform: [`translateX(5px)`],
          },
          {
            transform: [`translateX(-5px)`],
          },
        ],
        {
          duration: 300 + Math.floor(Math.random() * 500),
          composite: 'add',
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      )
      // when the 1.5 seconds are up, go away permanently
      leadAnimation.onfinish = () => {
        createEle.remove()
      }
    },
    onFocus(e) {
      if (e.type === 'focusout') {
        this.$store.dispatch('toggleUIState', 'reactions')
      }
    },
  },
}
</script>

// does the style need to be scoped? I can't target new elements for some reason
when scoped...

<style lang="scss">
.container:focus {
  outline: 0.1rem dashed rgba(lightgray, 0.1);
}
.reaction-space {
  .emoji {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
