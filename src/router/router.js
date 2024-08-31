import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '../components/RegistrationForm.vue';
import LoginPage from '../components/LoginPage.vue';

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
    // Add more routes here if needed
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
