import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'home',
      component: () => import('@/views/Home/index.vue')
    },
    {
      path: '/home',
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
    },
    { 
      path: '/artist',
      name: 'artist',
      component: () => import('@/views/Artist/index.vue')
    },
    { 
      path: '/album',
      name: 'album',
      component: () => import('@/views/Album/index.vue')
    },
    {
      path: '/newAlbum',
      name: 'newAlbum',
      component: () => import('@/views/NewAlbum/index.vue')
    },
    {
      redirect: '/home'
    }
  ]
})

router.afterEach((to, from) => {
  document.title = 'Happy-' + to.name
})

export default router
