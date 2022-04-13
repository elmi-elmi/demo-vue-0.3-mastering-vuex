<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BaseSelect
        v-model:modelValue="event.category"
        :options="categories"
        label="Select a category: "
        @blur="v$.event.category.$validate()"
      />
      <p v-if="v$.event.category.$error" class="error">
        Please select a category
      </p>

      <h3>Name & describe your event</h3>

      <BaseInput
        v-model:modelValue="event.title"
        class="field"
        label="Title"
        placeholder="Title"
        type="text"
        @blur="v$.event.title.$validate()"
      />

      <p v-if="v$.event.title.$error" class="error">
        Please enter a valid title
      </p>

      <BaseInput
        v-model:modelValue="event.description"
        class="field"
        label="Description"
        placeholder="Description"
        type="text"
        @blur="v$.event.description.$validate()"
      />
      <p v-if="v$.event.description.$error" class="error">
        Please enter a valid description
      </p>

      <h3>When is your event?</h3>

      <label>Date</label>
      <Datepicker v-model="event.date" @closed="v$.event.date.$validate()" />
      <p v-if="v$.event.date.$error" class="error">
        Please select a date
      </p>

      <h3>Where is your event?</h3>

      <BaseInput
        v-model:modelValue="event.location"
        class="field"
        label="Location"
        placeholder="Location"
        type="text"
        @blur="v$.event.location.$validate()"
      />
      <p v-if="v$.event.location.$error" class="error">
        Please enter a valid location
      </p>

      <BaseSelect
        v-model:modelValue="event.time"
        :options="times"
        label="Time: "
        @blur="v$.event.time.$validate()"
      />
      <p v-if="v$.event.time.$error" class="error">
        Please select a time
      </p>

      <BaseButton className="-fill-gradient" type="submit">Submit</BaseButton>
      <p v-if="v$.$error" class="error">
        Please check all fields
      </p>
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
  validations() {
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
      v$: useVuelidate(),
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
      this.v$.$validate()
      console.log(!this.v$.$error)
      if (!this.v$.$error) {
        console.log('----')
        NProgress.start()
        this.event.id = Math.floor(Math.random() * 10000000)
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'EventDetails',
              params: { id: this.event.id }
            })
          })
          .then(() => {
            this.createFreshEvent()
          })
          .catch(error => {
            NProgress.done()
            console.error(error.message)
          })
      }
      // else {
      //   console.log(this.v$.$error)
      // }
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

.error {
  color: red;
}
</style>
