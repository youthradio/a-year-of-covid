<template>
  <div class="flex flex-column assistant relative ios-bar-fix">
    <MenuHeader tabindex="0" />
    <!-- Slider div container -->
    <div ref="container" class="h-100 w-100 z-">
      <!-- Additional required wrapper -->
      <!-- Slides -->
      <header
        class="relative ph3 center min-vh-100 flex flex-column justify-center"
      >
        <article class="measure-wide relative center tc">
          <h1 class="day-sans f1-ns f3 lh-1-1 mt">
            {{ articleData.headline }}
          </h1>
          <h3 class="roboto-mono fw5 f3-ns f4 lh-title">
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
        class="vh-menu bg-dark-gray flex flex-column justify-between"
      >
        <div class="flex-auto flex">
          <div class="flex items-center justify-center items-center w-100">
            <div
              v-show="UIState.chat ? innerWidth > 767 : true"
              class="mw8 center ph4 grid grid-auto-rows grid-container--fit relative"
            >
              <template v-for="(participant, i) in participants">
                <video-player
                  :key="participant.name"
                  :index="innerWidth > 767 ? i : -1"
                  :video-folder="articleData.video_folder"
                  :participant="participant"
                  :is-unmuted="unmutedId === participant.id"
                  @onunmuted="onUnmuted"
                />
              </template>
            </div>
            <div
              v-show="UIState.chat"
              class="measure-narrow ml3-ns bg-white overflow-y-scroll h-100"
            >
              <chat :content="articleData.chat"></chat>
            </div>
          </div>
        </div>
        <div class="relative">
          <contributors
            v-show="UIState.contributors"
            class="absolute z-2 center-box"
            :content="participants"
          />
          <reactions
            v-show="UIState.reactions"
            :content="['🥲', '😒', '💀', '🤡', '👎']"
            class="absolute z-2 center-box"
          />
          <credits
            v-show="UIState.credits"
            class="absolute z-2 center-box"
            :content="articleData.credits"
          />
          <more
            v-show="UIState.more"
            class="absolute z-2 center-box"
            :content="articleData.more"
          />
          <div class="bg-near-black w-100">
            <menu-bar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import CommonUtils from '../mixins/CommonUtils'
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
import More from '~/components_local/More.vue'

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
    More,
  },
  mixins: [CommonUtils],

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
      innerWidth: 0,
      unmutedId: null,
    }
  },
  computed: {
    UIState() {
      return this.$store.state.UIState
    },
  },
  watch: {
    innerWidth() {
      this.setUIState({ chat: this.innerWidth > 767 })
    },
  },

  mounted() {
    window.addEventListener('resize', (event) =>
      this.debouceEvent(event, this.onWindowResize)
    )
    setTimeout(() => window.scrollTo(0, 10), 1000)
    this.onWindowResize()
    this.setUIState({ chat: this.innerWidth > 767 })
  },
  methods: {
    onWindowResize() {
      if (typeof window !== 'undefined') {
        this.innerWidth = window.innerWidth
      }
      if (process.client) {
        this.innerWidth = window.innerWidth
      }
      this.innerWidth = window.innerWidth
    },
    toggleAllUI() {
      const all = ['contributors', 'credits', 'reactions']
      this.setUIState(Object.fromEntries(all.map((e) => [e, false])))
    },
    setUIState(state) {
      this.$store.dispatch('setUIState', state)
    },
    startAudio() {
      const AudioContext = window.AudioContext || window.webkitAudioContext
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
.vh-menu {
  min-height: calc(100vh - 68px);
}
.center-box {
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
}
</style>
