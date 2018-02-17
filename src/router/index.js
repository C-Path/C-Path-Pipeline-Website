import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth'
import Dashboard from '@/components/Dashboard';
import JobStatus from '@/components/JobStatus';
import DataManager from '@/components/DataManager';
import Login from '@/components/Login'

import SequenceFileUpload from '@/pages/tnorth/asap/fileupload/SequenceFileUpload';
import FileIndex from '@/pages/tnorth/asap/FileIndex';
import NotFound from '@/pages/NotFound';


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
    },
    {path: '/upload', component: SequenceFileUpload},
    {path: '/projects/default', component: FileIndex},
    {path: '/projects/default/reports/tb', component: () => import('@/pages/tnorth/asap/tb/Summary.vue')},
    {path: '/projects/default/reports/tb/samples/:id', component: () => import('@/pages/tnorth/asap/tb/Sample.vue'), props: true},
    {path: 'projects/default/reports/tb/detail', component: () => import('@/pages/tnorth/asap/tb/SummaryDetail.vue')},
    {path: '/projects/default/reports/tb/samples/:id/detail', component: () => import('@/pages/tnorth/asap/tb/SampleDetail.vue'), props: true},
    {path: '/404', component: NotFound },
    {path: '*', redirect: '/404' },
  ],
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
