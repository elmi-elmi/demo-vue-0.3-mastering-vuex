import EventService from '@/services/EventService'
// import NProgress from 'nprogress'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, total) {
    state.eventsTotal = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  fetchEvents({ commit, state }, { page }) {
    return EventService.getEvents(state.perPage, page).then(response => {
      commit('SET_EVENTS', response.data)
      commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
    })
    // .catch(error => {
    //   console.log(error.response)
    //   const notification = {
    //     type: 'error',
    //     message: 'There was a problem fetching events: ' + error.message
    //   }
    //   dispatch('notification/add', notification, { root: true })
    // })
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event.length) {
      commit('SET_EVENT', event[0])
      return event[0]
    } else {
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  },
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
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
