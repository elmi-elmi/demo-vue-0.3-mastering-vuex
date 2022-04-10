import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
    console.log(state.events)
  },
  SET_EVENTS_TOTAL(state, total) {
    state.eventsTotal = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
      })
      .catch(error => {
        console.log(error.response)
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id)
    if (event.length) {
      commit('SET_EVENT', event[0])
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There is a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
  createEvent({ commit, dispatch }, event) {
    EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event created successfully.'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating event:' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw new Error(error.message)
      })
  }
}

export const getters = {
  getEventById: state => id => state.events.filter(event => event.id == id)
}
