import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '../pages/List.vue';
import Schedule from '../pages/Schedule.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Schedule',
    component: Schedule,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'List',
        component: List,
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
