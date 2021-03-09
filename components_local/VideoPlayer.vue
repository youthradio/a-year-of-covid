<template>
  <div
    class="center"
    @pointerdown.prevent="restartUnmute()"
    @mouseover="restartUnmute()"
    @mouseleave="
      mute(true)
      play()
    "
  >
    <div class="relative w-100 h-100 pa2">
      <div class="absolute w-100 h-100 flex justify-center items-center">
        <img class="grow-large br-100 bn h2 w2 dib" :src="participant.image" />
      </div>
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
  },
}
</script>

<style lang="scss"></style>
