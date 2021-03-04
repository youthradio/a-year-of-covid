<template>
  <div class="flex flex-column assistant relative">
    <MenuHeader class="z-10" :offset="100" :toggle-enable="false" />
    <!-- Slider div container -->
    <div ref="container" class="h-100 w-100">
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
              startAudio()
            "
          >
            Start Meeting
          </a>

          <p class="gray">
            {{ articleData.disclaimer }}
          </p>
        </article>
      </header>
      <div
        ref="startMeeting"
        class="flex flex items-center justify-center items-center min-vh-menu bg-dark-gray relative"
      >
        <div
          class="mw8 center h-100 flex flex-wrap justify-center align-stretch"
        >
          <div v-for="participant in participants" :key="participant.name">
            <video-player
              :video-folder="articleData.video_folder"
              :participant="participant"
              :is-unmuted="unmutedId === participant.id"
              @onunmuted="onUnmuted"
            />
          </div>
        </div>
        <div
          v-if="bChat"
          class="w-100 measure-narrow ml3 self-stretch bg-white absolute relative-ns bottom-0"
        >
          <chat :content="articleData.chat"></chat>
        </div>
        <div class="bottom-0 absolute w-100">
          <div class="flex justify-between items-end">
            <contributors
              v-if="bParticipants"
              class="mr-auto absolute relative-ns left-0"
              :content="participants"
            />
            <reactions
              v-if="bReactions"
              class="center absolute relative-ns left-0"
            />
            <credits
              v-if="bCredits"
              class="ml-auto absolute relative-ns right-0"
              :content="articleData.credits"
            />
          </div>
          <div class="bg-near-black w-100">
            <menu-bar />
          </div>
        </div>
      </div>

      <!-- <article class="ph3 pv3">
        <ShareContainer
          :title="postData.title"
          :description="postData.description"
          :tweet-message="postData.tweetMessage"
          :vertical-mode="false"
        />
      </article> -->
      <!-- 
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
      </article> -->
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import POSTCONFIG from '~/post.config'
import MenuHeader from '~/components/Header/MenuHeader'
// import ShareContainer from '~/components/Custom/ShareContainer'
import ArticleData from '~/data/data.json'
import VideoPlayer from '~/components_local/VideoPlayer.vue'
import Chat from '~/components_local/Chat.vue'
import Credits from '~/components_local/Credits.vue'
import Contributors from '~/components_local/Contributors.vue'
import MenuBar from '~/components_local/MenuBar.vue'
import Reactions from '~/components_local/Reactions.vue'

export default {
  components: {
    MenuHeader,
    // ShareContainer,
    VideoPlayer,
    Chat,
    Credits,
    Contributors,
    MenuBar,
    Reactions,
  },
  asyncData(ctx) {
    const articleData = ArticleData.content[0]

    return {
      postData: POSTCONFIG,
      articleData,
      participants: articleData.participants
        .map((p) => Object.assign(p, { id: nanoid() }))
        .sort(() => 0.5 - Math.random()),
    }
  },
  data() {
    return {
      audioPlayer: null,
      playerId: null,
      unmutedId: null,
    }
  },
  computed: {
    bCredits() {
      return this.$store.state.UIState.credits
    },
    bReactions() {
      return this.$store.state.UIState.reactions
    },
    bChat() {
      return this.$store.state.UIState.chat
    },
    bParticipants() {
      return this.$store.state.UIState.contributors
    },
  },
  watch: {},
  mounted() {
    this.audioPlayer = document.createElement('audio')
    this.audioPlayer.preload = 'metadata'
    this.audioPlayer.type = 'audio/mpeg'
  },
  methods: {
    toggleAllUI() {
      const all = ['contributors', 'credits', 'reactions']
      this.setUIState(Object.fromEntries(all.map((e) => [e, false])))
    },
    setUIState(state) {
      this.$store.dispatch('setUIState', state)
    },
    startAudio() {
      const audioCtx = new AudioContext()
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
    },
    onUnmuted({ id }) {
      this.unmutedId = id
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
.padding-menu {
  padding-top: 68px;
}
.min-vh-menu {
  min-height: calc(100vh - 68px);
}
</style>
