<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notif in notifications"
      :key="notif.id"
      :notification="notif"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar'
import { mapState } from 'vuex'

export default {
  name: 'NotificationContainer',
  components: { NotificationBar },
  computed: {
    ...mapState({
      notifications: state => state.notification.notifications
    })
  }
}
</script>
<style scoped>
.notification-container {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
