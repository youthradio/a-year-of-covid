export default {
  data() {
    return {
      _mixingDebouceTimer: null,
    }
  },
  computed: {
    isSafari() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    },
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  methods: {
    debouceEvent(event, callback) {
      if (this._mixingDebouceTimer) {
        window.cancelAnimationFrame(this._mixingDebouceTimer)
      }
      this._mixingDebouceTimer = window.requestAnimationFrame(() =>
        callback(event)
      )
    },
  },
}
