import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
//import EventCreate from './views/EventCreate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', //to use the browser history.pushState API to change the URL without reloading the page
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      // Notice this has to come before /event/:id
      path: '/event/create',
      name: 'event-create',
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "event-create" */ './views/EventCreate.vue'),
      alias: '/create' //user can go to /event/create or /create and they’ll get the same content
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true
    },
    {
      path: '*',
      redirect: { name: 'event-list' } //redirect to home page
    }
  ]
})
