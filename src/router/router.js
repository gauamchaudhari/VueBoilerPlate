import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '../components/RegistrationForm.vue';
import LoginPage from '../components/LoginPage.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import userList from '@/components/users/UserList.vue'
import UserCreate from '@/components/users/UserCreate.vue';

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
        component: userList
      },
      {
        path: '/user/create',
        name: 'UserCreate',
        component: UserCreate
      },
    ]
  },

  // Add more routes here if needed
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('authToken');
  if (authRequired && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
