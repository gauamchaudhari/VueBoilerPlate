// src/mixins/logoutMixin.js
import { useRouter } from 'vue-router';


export const logoutMixin = {
    setup() {
        const router = useRouter();
        const logout = () => {
            // Clear authToken and userEmail from local storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');

            // Redirect to login page
            router.push('/');
        };

        return {
            logout,
        };
    },
};
