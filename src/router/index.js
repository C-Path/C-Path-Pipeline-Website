import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import FileUpload from '@/components/FileUpload';
import JobStatus from '@/components/JobStatus';


Vue.use(Router);
export default new Router({
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/fileupload', name: 'FileUpload', component: FileUpload },
    { path: '/jobstatus', name: 'JobStatus', component: JobStatus },
  ],
});
