<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :key="option"
          :selected="option === event.category"
          :value="option"
          >{{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" placeholder="Title" type="text" />

      <label>Description</label>
      <input
        v-model="event.description"
        placeholder="Description"
        type="text"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" placeholder="Location" type="text" />

      <h3>When is your event?</h3>

      <label>Date</label>
      <Datepicker v-model="event.date" />

      <div>
        <label>Time</label> <br />
        <select
          v-model="event.time"
          name="time"
          id="time"
          class="field"
          value="time"
        >
          <option value="" disabled>Time</option>
          <option v-for="t in times" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  name: 'EventCreate',
  components: { Datepicker },
  data() {
    const times = []
    for (let i = 0; i < 24; i++) {
      times.push(i + ':00')
    }
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      },
      times
    }
  },
  methods: {
    onSubmit() {
      this.event.id = Math.random() * 10000000
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: this.event.id }
          })
          this.createFreshEvent()
        })
        .catch(error => {
          console.error(error.message)
        })
    },
    createFreshEvent() {
      this.event = {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      }
    }
  }
}
</script>
<style>
.dp__input {
  border: 1px solid #777;
  border-radius: 0;
  height: 33px;
}
.dp__main {
  width: 107%;
}

.field {
  width: 107%;
  height: 34px;
}
</style>
