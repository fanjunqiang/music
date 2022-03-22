import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/hotmusic',
    name: 'hotMusic',
    component: () => import('../views/hotMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },

  {
    path: '/playlist/:listId',
    name: 'PlayList',
    component: () => import('../views/PlayList.vue'),
  },
  {
    path: '/toplist',
    name: 'TopList',
    component: () => import('../views/TopList.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
