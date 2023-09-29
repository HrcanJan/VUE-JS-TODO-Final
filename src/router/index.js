import { createRouter, createWebHistory } from 'vue-router'
import List from '../shopping-list/List.vue'
import Deleted from '../shopping-list/Deleted.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/deleted',
    name: 'deleted',
    component: Deleted
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
