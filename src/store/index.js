import { createStore } from 'vuex'
import * as event from '@/store/modules/event'
import * as notification from '@/store/modules/notification'
export default createStore({
  modules: {
    event,
    notification
  },
  state() {
    return {
      cats: ['a', 'b', 'c']
    }
  }
  // mutations: {
  //   ADD_EVENT(state, event) {
  //     state.events.push(event)
  //   },
  //   ADD_EVENTS(state, events) {
  //     state.events = events
  //   },
  //   ADD_EVENTS_TOTAL(state, total) {
  //     state.eventsTotal = total
  //   }
  // },
  // actions: {
  //   fetchEvents({ commit }, { perPage, page }) {
  //     EventService.getEvents(perPage, page).then(response => {
  //       commit('ADD_EVENTS', response.data)
  //       commit('ADD_EVENTS_TOTAL', response.headers['x-total-count'])
  //     })
  //   },
  //   fetchEvent({ commit, getters }, id) {
  //     const event = getters.getEventById(id)
  //     if (event) {
  //       commit('ADD_EVENT', event)
  //     } else {
  //       EventService.getEvents(id).then(response => {
  //         commit('ADD_EVENT', response.data)
  //       })
  //     }
  //   },
  //   createEvent({ commit }, event) {
  //     EventService.postEvent(event).then(() => {
  //       commit('ADD_EVENT', event)
  //     })
  //   }
  // },

  // getters: {
  //   getEventById: state => id => state.events.filter(event => event.id === id)
  // }
})
