import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/EventDetails.vue'
import EventCreate from '@/views/EventCreate.vue'
import About from '@/views/About.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails,
    beforeEnter(to, from, next) {
      store.dispatch('event/fetchEvent', to.params.id).then(event => {
        to.params.event = event
        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
