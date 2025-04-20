import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '../components/RegistrationForm.vue';
import LoginPage from '../components/LoginPage.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import userList from '@/components/users/UserList.vue'
import UserCreate from '@/components/users/UserCreate.vue';
import UserEdit from '@/components/users/UserEdit.vue';

import RolesList from '@/components/roles/RolesList.vue';
import RoleCreate from '@/components/roles/RoleCreate.vue';
import RoleEdit from '@/components/roles/RoleEdit.vue';
import RolePermission from '@/components/roles/RolePermission.vue';

import PermissionsList from '@/components/permissions/PermissionsList.vue';

import UploadFiles from "@/components/users/UploadFiles.vue";
import FaqManagement from '@/components/faq/FaqManagement.vue';
import FaqCreate from '@/components/faq/FaqCreate.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationForm,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: UserDashboard,
        component: UserDashboard
      },
      {
        path: '/users',
        name: 'UserList',
        component: userList
      },
      {
        path: '/user/create',
        name: 'UserCreate',
        component: UserCreate
      },
      {
        path: '/user/:id',
        name: 'UserEdit',
        component: UserEdit,
        props: true
      },
      {
        path: "/users/:id/upload",
        name: "UploadFiles",
        component: UploadFiles,
      },
      {
        path: '/roles',
        name: 'RolesList',
        component: RolesList
      },
      {
        path: '/role/create',
        name: 'rolecreate',
        component: RoleCreate
      },
      {
        path: '/role/:id',
        name: 'RoleEdit',
        component: RoleEdit,
        props: true
      },
      {
        path: '/role/:id/permission',
        name: 'RolePermission',
        component: RolePermission,
        props: true
      },

      {
        path: '/permissions',
        name: 'PermissionsList',
        component: PermissionsList
      },
      {
        path: '/faq',
        name: 'FaqManagement',
        component: FaqManagement
      },
      {
        path: '/faq/create',
        name: 'FaqCreate',
        component: FaqCreate
      }
    ],

  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('authToken');
  if (authRequired && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
