import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/EventDetails.vue'
import EventCreate from '@/views/EventCreate.vue'
import About from '@/views/About.vue'
import NProgress from 'nprogress'
import store from '@/store/index'
import NotFound from '@/views/NotFound'
import NetworkIssue from '@/views/NetworkIssue'

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
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(event => {
          to.params.event = event
          next()
        })
        .catch(error => {
          if (error.response?.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            console.log('**********8')
            next({ name: 'NetworkIssue' })
          }
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
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: '404', params: { resource: 'page' } }
  },
  {
    path: '/Network-issue',
    name: 'NetworkIssue',
    component: NetworkIssue
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
