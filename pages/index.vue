<template>
  <div class="vh-100-ns flex flex-column assistant relative">
    <MenuHeader class="z-10" :menu-fixed="true" />
    <!-- Slider div container -->
    <div ref="container" class="h-100 w-100 m-menu">
      <!-- Additional required wrapper -->
      <!-- Slides -->
      <header
        class="relative ph3 center min-vh-100 flex flex-column justify-center"
      >
        <article class="measure-wide relative center tc">
          <h1 class="day-sans f1-ns f3 lh-title mt">
            {{ articleData.headline }}
          </h1>
          <h3 class="roboto-mono fw3 f3-ns f4 lh-title">
            {{ articleData.subheadline }}
          </h3>
          <h4 class="assistant normal">{{ articleData.date }}</h4>
          <a
            class="f6 pointer dib grow no-underline br2 ph3 pv2 mb2 white bg-blue tc"
            @click.prevent="
              $refs.startMeeting.scrollIntoView({ behavior: 'smooth' })
            "
          >
            Start Meeting
          </a>

          <p class="gray">
            {{ articleData.disclaimer }}
          </p>
        </article>
      </header>
      <article ref="startMeeting" class="ph3 justify-center pv3">
        <div
          class="measure-wide lh-copy center"
          v-html="articleData.intro.text"
        ></div>
      </article>

      <article class="mw7 ph3 relative center">
        <div class="f7 o-40 tc" v-html="articleData.terms.text" />

        <div v-for="participant in participants" :key="participant.name">
          {{ participant }}

          <video
            class="db w-100"
            controls="false"
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
        </div>
      </article>
      <article class="ph3 pv3">
        <ShareContainer
          :title="postData.title"
          :description="postData.description"
          :tweet-message="postData.tweetMessage"
          :vertical-mode="false"
        />
      </article>

      <article class="ph3 pv3">
        <div class="measure-wide center lh-copy">
          <h3 class="roboto-mono fw6 f3-ns f4 lh-title">CREDITS</h3>
          <div v-html="articleData.credits.text"></div>

          <template v-for="credit in articleData.credits.list">
            <dl :key="credit.ttitle" class="lh-title mv2">
              <dt class="dib b green">{{ credit.title }}:</dt>
              <dd class="di ml0">{{ credit.names }}</dd>
            </dl>
          </template>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'
import POSTCONFIG from '~/post.config'
import MenuHeader from '~/components/Header/MenuHeader'
import ShareContainer from '~/components/Custom/ShareContainer'
import ArticleData from '~/data/data.json'

export default {
  components: {
    MenuHeader,
    ShareContainer,
  },
  mixins: [CommonUtils],
  asyncData(ctx) {
    const articleData = ArticleData.content[0]

    return {
      postData: POSTCONFIG,
      articleData,
      participants: articleData.participants,
    }
  },
  data() {
    return {
      audioPlayer: null,
      playerId: null,
      isPlaying: false,
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.audioPlayer = document.createElement('audio')
    this.audioPlayer.preload = 'metadata'
    this.audioPlayer.type = 'audio/mpeg'
  },
  methods: {
    playSong({ isPlaying, url, id }) {
      this.playerId = id
      if (!isPlaying) {
        this.audioPlayer.pause()
        this.audioPlayer.src = url
        this.audioPlayer.play()
      } else {
        this.playerId = null
        this.isPlaying = false
        this.audioPlayer.pause()
        this.audioPlayer.currentTime = 0
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/styles';
@import '~@/assets/css/mixins';

.disable-mouse {
  pointer-events: none;
}
.fit-cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.max-dim {
  max-height: calc(MIN(80rem, 100vh) - 68px);
}
button {
  font-family: $assistant;
}
.m-menu {
  margin-top: 68px;
}
</style>
