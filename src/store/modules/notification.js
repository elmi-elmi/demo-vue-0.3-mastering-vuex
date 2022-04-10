export const namespaced = true

export const state = {
  notifications: []
}
let nextId = 1
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({ ...notification, id: nextId })
    nextId++
  },
  DELETE(state, notificaitonToRemove) {
    state.notifications = state.notifications.filter(
      notif => notif.id !== notificaitonToRemove.id
    )
    console.log(state)
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}
