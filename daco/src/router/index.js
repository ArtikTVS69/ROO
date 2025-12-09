import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import UserDetail from '../views/UserDetail.vue'
import ContactView from '../views/ContactView.vue'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      // parameter :id z url
      path: '/users/:id',
      name: 'user-detail',
      component: UserDetail,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView,
    },
  ],
})

// vypise do konzoly kam idem
router.beforeEach((to, from) => {
  console.log('Idem z', from.path, 'na', to.path)
})

export default router
