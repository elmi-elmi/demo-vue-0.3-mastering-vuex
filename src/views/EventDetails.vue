<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['id'],
  created() {
    // this.$store.dispatch('event/fetchEvent', this.id)
    this.fetchEvent(this.id)
  },
  computed: mapState({ event: state => state.event.event }),
  methods: mapActions({ fetchEvent: 'event/fetchEvent' })
}
</script>
