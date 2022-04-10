<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import { mapState, mapActions } from 'vuex'
// import store from '@/store/index'
// import NProgress from 'nprogress'

export default {
  props: ['id', 'event']
  // beforeRouteEnter(to, from, next) {
  //   NProgress.start()
  //   store
  //     .dispatch('event/fetchEvent', to.params.id)
  //     .then(() => {
  //       NProgress.done()
  //       next()
  //     })
  //     .catch(error => {
  //       NProgress.done()
  //       console.error(error.message)
  //     })
  // },
  // computed: mapState({ event: state => state.event.event })
  // methods: mapActions({ fetchEvent: 'event/fetchEvent' })
}
</script>
