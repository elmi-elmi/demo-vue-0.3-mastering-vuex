<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="page !== 1"
      rel="prev"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      >Prev Page
    </router-link>
    |
    <router-link
      v-if="hasNextPate"
      rel="next"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      >Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.perPage = 3
    this.fetchEvents({ perPage: this.perPage, page: this.page })
    // this.$store.dispatch('event/fetchEvents', {
    //   perPage: this.perPage,
    //   page: this.page
    // })
  },
  methods: {
    ...mapActions({ fetchEvents: 'event/fetchEvents' })
  },
  computed: {
    ...mapState({
      events: state => state.event.events,
      eventsTotal: state => state.event.eventsTotal
    }),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPate() {
      return this.eventsTotal > this.perPage * this.page
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
