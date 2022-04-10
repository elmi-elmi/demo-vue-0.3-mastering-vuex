<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="page !== 1"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      >Prev Page
    </router-link>
    |
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      >Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/index'

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1
  store.dispatch('event/fetchEvents', { page: currentPage }).then(() => {
    to.params.page = currentPage
    next()
  })
}

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next)
  },
  // created() {
  //   this.perPage = 3
  //   this.fetchEvents({ perPage: this.perPage, page: this.page })
  // this.$store.dispatch('event/fetchEvents', {
  //   perPage: this.perPage,
  //   page: this.page
  // })
  // },
  // methods: {
  //   ...mapActions({ fetchEvents: 'event/fetchEvents' })
  // },
  computed: {
    ...mapState({
      events: state => state.event.events,
      eventsTotal: state => state.event.eventsTotal,
      perPage: state => state.event.perPage
    }),
    // page() {
    //   return parseInt(this.$route.query.page) || 1
    // },
    hasNextPage() {
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
