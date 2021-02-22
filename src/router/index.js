/*
 * @Author: eds
 * @Date: 2020-07-01 14:19:49
 * @LastEditTime: 2020-08-27 10:55:57
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\router\index.js
 */
import Vue from "vue";
import Router from "vue-router";
import store from '../store'

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [{
      path: "/",
      redirect: "sourcelayer"
    },
    {
      path: "/sourcelayer",
      name: "sourcelayer",
      component: resolve => require(["page/sourcelayer/sourcelayer"], resolve)
    },
    {
      path: "/compare",
      name: "compare",
      component: resolve => require(["page/compare/compare"], resolve)
    },
    {
      path: "/decision",
      name: "decision",
      component: resolve => require(["page/decision/decision"], resolve)
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["page/login/login"], resolve)
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.name !== 'login') {
    if (store.state.login.username) {
      next()
    } else {
      next(`/login?redirect=${to.name}`)
    }
  }
  next()
})

export default router;
