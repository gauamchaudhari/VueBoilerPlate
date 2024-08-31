import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

// Import AdminLTE and Bootstrap CSS
import 'admin-lte/dist/css/adminlte.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import jQuery, Popper.js, Bootstrap, and AdminLTE JS
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

// createApp(App).use(router).mount('#app');
const app = createApp(App);

// Set global properties
app.config.globalProperties.$logoName = 'ZOPA Bank';
app.use(router);
app.mount("#app");
