import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth'

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: () => import('@/components/Login'), beforeEnter: checkToken},
    {path: '/dashboard', name: 'Dashboard', component: () => import('@/components/Dashboard'), beforeEnter: requireAuth},
    {path: '/datamanager', name: 'DataManager', component: () => import('@/components/DataManager'), beforeEnter: requireAdmin},
    {path: '*', beforeEnter: redirectUser },
    {path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    },
  ],
});

function checkToken (to, from, next) {
  if (auth.loggedIn()) {
    if (auth.isManager()) {
      next({
        path: '/datamanager',
        query: { redirect: to.fullPath }
      })
    } else {
      next({
        path: '/dashboard',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
}

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function requireAdmin (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    if (!auth.isManager()) {
      next({
        path: '/dashboard',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
}

function redirectUser (to, from, next) {
    var user = auth.parseJwt(JSON.parse(localStorage.getItem('token')))
  if (auth.isManager()) {
    next({
      path: '/datamanager',
      query: { redirect: to.fullPath }
    })
  } else {
    next({
      path: '/dashboard',
      query: { redirect: to.fullPath }
    })
  }
}

export default router
