import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth'

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: () => import('@/components/Login')},
    {path: '/dashboard', name: 'Dashboard', component: () => import('@/components/Dashboard'), beforeEnter: requireAuth},
    {path: '/jobstatus', name: 'JobStatus', component: () => import('@/components/JobStatus'), beforeEnter: requireAuth},
    {path: '/datamanager', name: 'DataManager', component: () => import('@/components/DataManager'), beforeEnter: requireAdmin},
    {path: '/upload', component: () => import('@/pages/tnorth/asap/fileupload/SequenceFileUpload')},
    {path: '/projects/default', component: () => import('@/pages/tnorth/asap/FileIndex')},
    {path: '/projects/default/reports/tb', component: () => import('@/pages/tnorth/asap/tb/Summary.vue'), beforeEnter: requireAuth},
    {path: '/projects/default/reports/tb/samples/:id', component: () => import('@/pages/tnorth/asap/tb/Sample.vue'), props: true, beforeEnter: requireAuth},
    {path: 'projects/default/reports/tb/detail', component: () => import('@/pages/tnorth/asap/tb/SummaryDetail.vue'), beforeEnter: requireAuth},
    {path: '/projects/default/reports/tb/samples/:id/detail', component: () => import('@/pages/tnorth/asap/tb/SampleDetail.vue'), props: true, beforeEnter: requireAuth},
    {path: '/404', component: () => import('@/pages/NotFound')},
    {path: '*', beforeEnter: redirectUser },
    {path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    },
  ],
});

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
