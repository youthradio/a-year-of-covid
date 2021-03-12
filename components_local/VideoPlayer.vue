<template>
  <div
    tabindex="0"
    class="container pointer"
    :style="
      !isClicked && index > 5
        ? { gridColumn: index > 6 ? 3 : 2, transform: 'translateX(-50%)' }
        : {}
    "
    @pointerdown.prevent="
      if (!isClicked) {
        $el.focus()
        setUIState({ chat: false })
        isClicked = true
        if (!isUnmuted) {
          restartUnmute()
        }
      }
    "
    @mouseover="
      if (!isClicked) {
        $el.focus()
        restartUnmute()
      }
    "
    @mouseleave="
      if (!isClicked) {
        mute(true)
        play()
      }
    "
  >
    <div
      v-if="isClicked"
      class="fixed h-100 w-100 top-0 left-0 blur-bg"
      @click="
        isClicked = false
        mute(true)
        play()
      "
    ></div>
    <div
      :class="[
        isClicked ? 'full-video' : ' w-100 h-100',
        'relative w-100 h-100 pa2',
      ]"
    >
      <div class="absolute w-100 h-100 flex justify-center items-center">
        <img class="grow-large br-100 bn h2 w2 dib" :src="participant.image" />
      </div>
      <div class="relative w-100 h-100 z-0">
        <video
          ref="video"
          :class="[
            'db w-100 h-100 object-fit-cover relative outline-yellow',
            isUnmuted ? 'outline-yellow-static' : '',
          ]"
          autoplay
          controlsList="nodownload nofullscreen noremoteplayback"
          playsinline
          muted
          disablePictureInPicture
        >
          <source
            v-for="video in participant.videos"
            :key="video.url"
            :src="`${videoFolder}/${video.file}`"
            :type="`video/${video.type}`"
          />
        </video>
        <div class="absolute right-0 top-0 z-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 576 482"
            height="15"
          >
            <defs />
            <path
              fill="#000"
              d="M215 56l-89 89H24c-13 0-24 11-24 24v144c0 13 11 24 24 24h102l89 89c15 15 41 4 41-17V73c0-21-26-32-41-17z"
            />
            <g v-if="!isUnmuted">
              <path
                fill="#000"
                d="M490 195l-45 46 45 46c7 6 7 16 0 22l-23 23c-6 7-16 7-22 0l-46-45-46 45c-6 7-16 7-22 0l-23-23c-7-6-7-16 0-22l45-46-45-46c-7-6-7-16 0-22l23-23c6-7 16-7 22 0l46 45 46-45c6-7 16-7 22 0l23 23c7 6 7 16 0 22z"
              />
            </g>

            <g v-else>
              <path
                fill="#000"
                d="M415 12c7-11 22-14 33-7a282 282 0 010 472 24 24 0 01-26-40 233 233 0 000-392c-11-7-14-22-7-33z"
              />
              <path
                fill="#000"
                d="M394 85a185 185 0 010 312c-12 8-26 3-33-7-7-12-4-26 8-34a136 136 0 000-230c-12-8-15-22-8-34 7-11 22-14 33-7z"
              />

              <path
                fill="#000"
                d="M306 174c6-12 21-16 32-10 28 16 46 45 46 77s-18 61-46 77a24 24 0 01-23-42c13-7 21-21 21-35s-8-28-21-35c-12-6-16-21-9-32z"
              />
            </g>
          </svg>
        </div>
      </div>

      <span class="f7 ma2 pa1 absolute bottom-0 left-0 db bg-black-70 white">{{
        participant.name
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    participant: { type: Object, required: true },
    videoFolder: { type: String, required: true },
    isUnmuted: { type: Boolean, require: true },
    index: { type: Number, required: true },
  },
  data() {
    return {
      isClicked: false,
    }
  },
  watch: {
    isUnmuted() {
      if (!this.isUnmuted) {
        this.mute(true)
      }
    },
  },
  mounted() {
    this.$refs.video.addEventListener('play', this.onPlay)
    this.$refs.video.addEventListener('ended', this.onEnded)
  },
  methods: {
    onEnded() {
      this.mute(true)
      this.play()
    },
    play() {
      this.$refs.video.play()
    },
    pause() {
      this.$refs.video.pause()
    },
    restartUnmute() {
      this.$refs.video.currentTime = 0
      this.$emit('onunmuted', { id: this.participant.id })
      if (this.$refs.video.muted) {
        this.mute(false)
      }
      this.play()
    },
    mute(state) {
      this.$refs.video.muted = state
    },
    setUIState(state) {
      this.$store.dispatch('setUIState', state)
    },
    onClickOut() {
      this.isClicked = false
      this.mute(true)
      this.play()
    },
  },
}
</script>

<style lang="scss" scoped>
.container:focus {
  outline: 0 dashed rgba(lightgray, 0.1);
}
</style>
