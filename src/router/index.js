import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import FileUpload from '@/components/FileUpload';


Vue.use(Router);
export default new Router({
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/fileupload', component: FileUpload },
  ],
});
