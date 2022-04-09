import { createStore } from 'vuex'
import EventService from '@/services/EventService'
export default createStore({
  state() {
    return {
      events: [],
      event: null
    }
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    ADD_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page).then(response => {
        commit('ADD_EVENTS', response.data)
      })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        commit('ADD_EVENT', event)
      } else {
        EventService.getEvents(id).then(response => {
          commit('ADD_EVENT', response.data)
        })
      }
    },
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
  modules: {},
  getters: {
    getEventById: state => id => state.events.filter(event => event.id === id)
  }
})
