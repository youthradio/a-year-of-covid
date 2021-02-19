<template>
  <div class="vh-100-ns flex flex-column assistant relative">
    <MenuHeader class="z-10" :menu-fixed="true" />
    <!-- Slider div container -->
    <div ref="container" class="h-100 w-100 m-menu">
      <!-- Additional required wrapper -->
      <!-- Slides -->
      <div class="relative ph3 center">
        <div class="z--1 op o-70 nl3 nr3">
          <img
            srcset="
              yriHEADWERrectangle_small.jpg    600w,
              yriHEADWERrectangle_feature.jpg 1400w
            "
            sizes="(max-width: 600px) 600w,
            1400w"
            loading="lazy"
            width="1400"
            height="875"
            class="db fit-cover max-dim"
            src="yriHEADWERrectangle_feature.jpg"
          />
        </div>
        <article
          class="measure-wide relative center absolute-ns bottom-0 left-0 right-0"
        >
          <h3 class="roboto-mono fw3 f3-ns f4 lh-title mb1">OPINION</h3>

          <h1 class="day-sans f1-ns f3 lh-title mt">
            A Soundtrack for the <span class="nowrap">Trump-Free</span> White
            House
          </h1>
          <h3 class="roboto-mono fw3 f3-ns f4 lh-title">
            New Administration, New Playlist
          </h3>
          <h4 class="assistant normal">By YR Arts & Interactive Team</h4>
          <h4 class="assistant normal">01.19.21</h4>
        </article>
      </div>
      <article class="ph3 justify-center pv3">
        <div
          class="measure-wide lh-copy center"
          v-html="articleData.intro.text"
        ></div>
      </article>

      <article class="mw7 ph3 relative center">
        <div class="f7 o-40 tc" v-html="articleData.terms.text" />

        <div v-for="song in songs" :key="song.song_name">
          <SongItem
            :song="song"
            :is-playing="playerId === song.id"
            @play-song="playSong"
          />
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
import POSTCONFIG from '../post.config'
import MenuHeader from '~/components/Header/MenuHeader'
import ShareContainer from '~/components/Custom/ShareContainer'
import SongItem from '~/components_local/SongItem'

import ArticleData from '~/data/data.json'
import Tracks from '~/data/tracks.json'

export default {
  components: {
    MenuHeader,
    ShareContainer,
    SongItem,
  },
  mixins: [CommonUtils],
  asyncData(ctx) {
    const content = ArticleData.content[0]
    const tracks = Object.fromEntries(Tracks)
    const articleData = Object.assign({}, content, {
      songs: content.songs.map((song) =>
        Object.assign({}, song, { track: tracks[song.id] })
      ),
    })

    return {
      postData: POSTCONFIG,
      articleData,
      songs: articleData.songs,
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
