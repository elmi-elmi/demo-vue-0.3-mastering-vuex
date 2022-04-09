import { createStore } from 'vuex'
import EventService from '@/services/EventService'
export default createStore({
  state() {
    return {
      events: []
    }
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
  modules: {},
  getters: {
    todoLength: state => state.todos.length,
    doneTodoes: state => state.todos.filter(todo => todo.done)
  }
})
