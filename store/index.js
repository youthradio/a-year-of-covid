export const state = () => ({
  UIState: {
    chat: true,
    credits: false,
    reactions: false,
    contributors: false,
    more: false,
  },
})
const SINGLES = ['contributors', 'credits', 'reactions', 'more']

export const actions = {
  setUIState({ commit }, newstate) {
    commit('SET_UISTATE', newstate)
  },
  toggleUIState({ commit }, element) {
    commit('TOGGLE_UISTATE', element)
  },
}
export const mutations = {
  TOGGLE_UISTATE(state, element) {
    if (!(element in state.UIState)) {
      throw new Error("UIState property doesn't exist")
    }

    SINGLES.filter((e) => e !== element).forEach((e) => {
      state.UIState[e] = false
    }) // remove element from list

    state.UIState = Object.assign(state.UIState, {
      [element]: !state.UIState[element],
    })
  },
  SET_UISTATE(state, newstate) {
    state.UIState = Object.assign(state.UIState, newstate)
  },
}
