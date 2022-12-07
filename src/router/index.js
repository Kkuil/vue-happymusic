import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/index.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/Explore/index.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/Library/index.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue'),
      children: [
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/Account/index.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile/index.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/views/Playlist/index.vue'),
    }
  ]
})

router.afterEach((to, from) => {
  document.title = 'Happy-' + to.name
})

export default router
