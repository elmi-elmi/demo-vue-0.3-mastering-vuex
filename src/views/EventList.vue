<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="page !== 1"
      rel="prev"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      >Prev Page</router-link
    >
    |
    <router-link
      rel="next"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('fetchEvents', { perPage: 3, page: this.page })
  },
  computed: {
    ...mapState(['events']),
    page() {
      return parseInt(this.$route.query.page) || 1
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
