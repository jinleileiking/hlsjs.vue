/**
 * @author valor.
 */

import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/monitor",
      component: () => import('../views/Monitor.jsx')
    }
  ],
})

router.beforeEach((to, from) => {
    return true
})

export default router
