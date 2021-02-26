<template>
  <div
    class="relative h-100"
    @pointerenter.prevent="
      restart()
      mute(false)
    "
    @pointerout.prevent="mute(true)"
  >
    <video
      ref="video"
      class="db w-100 h-100 object-fit-cover"
      loop
      autoplay
      controlsList="nodownload nofullscreen noremoteplayback"
      playsinline
      muted
      disablePictureInPicture
    >
      <source
        v-for="video in participant.videos"
        :key="video.url"
        :src="video.url"
        :type="`video/${video.type}`"
      />
    </video>
    <span class="f5 pa2 absolute bottom-0 left-0 db bg-black-70 white">{{
      participant.name
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    participant: { type: Object, required: true },
  },
  watch: {
    unmuted() {
      this.mute(this.unmuted)
    },
  },
  methods: {
    play() {
      this.$refs.video.play()
    },
    pause() {
      this.$refs.video.pause()
    },
    restart() {
      this.$refs.video.currentTime = 0
    },
    mute(state) {
      if (!state) this.$emit('on-unmuted', this.participant.id)
      this.$refs.video.muted = state
    },
  },
}
</script>

<style lang="scss"></style>
