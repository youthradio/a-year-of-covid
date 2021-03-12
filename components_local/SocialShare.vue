<template>
  <div class="flex justify-center">
    <a
      target="_blank"
      rel="nofollow"
      :href="`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(
        title
      )}`"
      class="icon-hover pointer f6 bn grow light-silver ph2 flex flex-column justify-between"
    >
      <fbicon :id="randomLetters()" class="icon pv2" />
    </a>
    <a
      target="_blank"
      rel="nofollow"
      :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${title}: ${url} ${tweetMessage}`
      )}`"
      class="icon-hover pointer f6 bn grow light-silver ph2 flex flex-column justify-between"
    >
      <twittericon :id="randomLetters()" class="icon pv2" />
    </a>
    <a
      target="_blank"
      rel="nofollow"
      :href="`mailto:info@example.com?&subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(`${description}\n${url}`)}`"
      class="icon-hover pointer f6 bn grow light-silver ph2 flex flex-column justify-between"
    >
      <emailicon :id="randomLetters()" class="icon pv2" />
    </a>
  </div>
</template>

<script>
import { fbicon, twittericon, emailicon } from '~/components_local/Icons'

export default {
  components: { fbicon, twittericon, emailicon },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tweetMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    url() {
      if (process.client && this.isMounted) {
        return window.location.href
      }
      return null
    },
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    randomLetters() {
      return Array(4)
        .fill()
        .map(() => String.fromCharCode((65 + Math.random() * 25) >> 0))
        .join('')
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/variables';

.icon {
  height: 1.3rem;
}
.icon-hover:hover /deep/ .inner-path {
  stroke: $green;
}
.icon-hover /deep/ .inner-path {
  stroke: $silver;
}
</style>
