import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
      children: [
        { path: '', component: () => import('../pages/IndexPage.vue'), name: 'home' }
      ],
      meta: { requiresLogin: false }
    },
  ]
})

export default router
