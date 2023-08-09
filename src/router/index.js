import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: '/page3',
      name: 'page3',
      component: () => import('../views/Page3.vue'),
      meta: {}
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('../views/departments/Departments.vue'),
      children: [
        {
          path: '/CountyClerk',
          name: 'countyClerk',
          component: () => import('../views/departments/CountyClerk.vue')
        }
      ]
    },{
      path: '/DadJokes',
      name: 'DadJokes',
      component: () => import('../views/DadJokes.vue'),
      meta: {}
    }
  ],
  linkActiveClass: 'active'
})

export default router
