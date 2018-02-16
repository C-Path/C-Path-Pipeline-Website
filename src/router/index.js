import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth'
import Dashboard from '@/components/Dashboard';
import JobStatus from '@/components/JobStatus';
import DataManager from '@/components/DataManager';
import Login from '@/components/Login'


Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: Login},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard, beforeEnter: requireAuth},
    {path: '/jobstatus', name: 'JobStatus', component: JobStatus, beforeEnter: requireAuth},
    {path: '/datamanager', name: 'DataManager', component: DataManager, beforeEnter: requireAdmin},
    {path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
  }],
});

export default router

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
