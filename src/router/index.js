import { createRouter, createWebHistory } from 'vue-router'
import { intact_path } from '@/router/guard.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'home',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Home/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Home/index.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      beforeEnter: [intact_path],
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Explore/index.vue')
    },
    {
      path: '/library',
      name: 'library',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Library/index.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Setting/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: true
      },
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
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Profile/index.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Playlist/index.vue'),
    },
    { 
      path: '/artist',
      name: 'artist',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Artist/index.vue')
    },
    { 
      path: '/album',
      name: 'album',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Album/index.vue')
    },
    {
      path: '/newAlbum',
      name: 'newAlbum',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/NewAlbum/index.vue')
    },
    {
      path: '/recommendArtists',
      name: 'recommendArtists',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/RecommendArtists/index.vue')
    },
    {
      path: '/mv',
      name: 'mv',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/Mv/index.vue')
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
