import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseInput from '@/components/BaseInput'
import 'nprogress/nprogress.css'
import BaseSelect from '@/components/BaseSelect'
import BaseButton from '@/views/BaseButton'

createApp(App)
  .use(store)
  .use(router)
  .component('BaseInput', BaseInput)
  .component('BaseSelect', BaseSelect)
  .component('BaseButton', BaseButton)
  .mount('#app')
