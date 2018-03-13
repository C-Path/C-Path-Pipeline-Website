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
    {path: '/jobstatus', name: 'JobStatus', component: () => import('@/components/JobStatus'), beforeEnter: requireAuth},
    {path: '/datamanager', name: 'DataManager', component: () => import('@/components/DataManager'), beforeEnter: requireAdmin},
    {path: '/upload', name: 'Upload', component: () => import('@/pages/tnorth/asap/fileupload/SequenceFileUpload'), beforeEnter: requireAuth},
    {path: '/projects/default', component: () => import('@/pages/tnorth/asap/FileIndex')},
    {path: '/projects/default/reports/tb', component: () => import('@/pages/tnorth/asap/tb/Summary.vue'), beforeEnter: requireAuth},
    {path: '/projects/default/reports/tb/samples/:id', component: () => import('@/pages/tnorth/asap/tb/Sample.vue'), props: true, beforeEnter: requireAuth},
    {path: 'projects/default/reports/tb/detail', component: () => import('@/pages/tnorth/asap/tb/SummaryDetail.vue'), beforeEnter: requireAuth},
    {path: '/projects/default/reports/tb/samples/:id/detail', component: () => import('@/pages/tnorth/asap/tb/SampleDetail.vue'), props: true, beforeEnter: requireAuth},
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
  if (localStorage.getItem('token') != null) {
    if (localStorage.getItem('role') == 'DATA_MANAGER') {
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
  if (localStorage.getItem('token') == null) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function requireAdmin (to, from, next) {
  if (localStorage.getItem('token') == null) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    if (localStorage.getItem('role') === 'USER') {
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
  if (localStorage.getItem('user') == 'DATA_MANAGER') {
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
