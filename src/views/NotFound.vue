<template>
  <div class="error404">
    <h1>404 Error</h1>
    <h3>The {{ resource }} not found</h3>
    <router-link :to="{ name: 'EventList' }">Back to home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: ['resource']
}
</script>

<style scoped>
.error404 {
  margin: 0 auto;
}
</style>
