<template>
  <div :class="notificationTypeClass" class="notification-bar">
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NotificationBar',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return { timeout: null }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 1000)
  },
  beforeUnmount() {
    clearTimeout(this.timeout)
  },
  methods: mapActions('notification', ['remove']),
  computed: {
    notificationTypeClass() {
      return '-text-' + this.notification.type
    }
  }
}
</script>
<style scoped>
.-text-error {
  background-color: crimson;
}

.-text-success {
  background-color: forestgreen;
}
</style>
