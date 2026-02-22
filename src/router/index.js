import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage.vue'
import CategoriesView from '@/pages/CategoriesPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    }
  ],
})

export default router
