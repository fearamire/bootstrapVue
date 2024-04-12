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
      path: '/D3/D3_Education_Data',
      name: 'D3 Education Data',
      component: () => import('../views/D3/EducationData.vue'),
      meta: {}
    },
    {
      path: '/D3/D3_Heat_Map',
      name: 'D3 Heat Map',
      component: () => import('../views/D3/HeatMap.vue'),
      meta: {}
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('../views/departments/Departments.vue'),
      children: [
        {
          path: '/County_Clerk',
          name: 'County Clerk',
          component: () => import('../views/departments/CountyClerk.vue')
        }
      ]
    },{
      path: '/Dad_Jokes',
      name: 'Dad Jokes',
      component: () => import('../views/DadJokes.vue'),
      meta: {}
    }
  ],
  linkActiveClass: 'active'
})

export default router
