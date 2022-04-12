<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BaseSelect
        v-model:modelValue="event.categories"
        :options="categories"
        label="Select a category: "
      />

      <h3>Name & describe your event</h3>

      <BaseInput
        v-model:modelValue="event.title"
        class="field"
        label="Title"
        placeholder="Title"
        type="text"
      />

      <BaseInput
        v-model:modelValue="event.description"
        class="field"
        label="Description"
        placeholder="Description"
        type="text"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        v-model:modelValue="event.location"
        class="field"
        label="Location"
        placeholder="Location"
        type="text"
      />
      <h3>When is your event?</h3>

      <label>Date</label>
      <Datepicker v-model="event.date" />

      <BaseSelect
        v-model:modelValue="event.time"
        :options="times"
        label="Time: "
      />

      <BaseButton className="-fill-gradient" type="submit">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import NProgress from 'nprogress'
import BaseButton from '@/views/BaseButton'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'EventCreate',
  setup() {
    return { v$: useVuelidate() }
  },
  validation() {
    return {
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required }
      }
    }
  },
  components: { BaseButton, Datepicker },
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
      NProgress.start()
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
          NProgress.done()
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
  /*width: 107%;*/
  /*height: 34px;*/
}
</style>
