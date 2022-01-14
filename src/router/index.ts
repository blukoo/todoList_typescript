import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '../pages/List.vue';
import Room from '../pages/Room.vue';
import testPage from '../layouts/Test.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/Room',
    name: 'Room',
    component: Room,
    children: [
      {
        path: '/List',
        name: 'List',
        component: List,
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../pages/About.vue'),
      },
    ],
  },
  {
    path: '/test/test0',
    name: 'test0',
    component: () => import('../pages/Test0.vue'),
  },
  {
    path: '/',
    component: () => import('../layouts/Enter.vue'),
    children: [
      {
        path: '/',
        name: 'Login/:id',
        component: () => import('../pages/Login.vue'),
      },
      {
        path: '/Join',
        name: 'Join',
        component: () => import('../pages/Join.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
