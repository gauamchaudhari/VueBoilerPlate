import { createApp } from 'vue';
import App from './App.vue';
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import router from './router/router';

// Import AdminLTE and Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

// Import jQuery, Popper.js, Bootstrap, and AdminLTE JS
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'admin-lte/dist/js/adminlte.min.js';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.min.mjs'

// createApp(App).use(router).mount('#app');
const app = createApp(App);

app.use(Toast);
app.use(router);

// Set global properties
app.config.globalProperties.$logoName = 'ZOPA Bank';

app.mount("#app");

window.$ = $; 
