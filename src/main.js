import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

// Import Bootstrap and AdminLTE CSS
import 'bootstrap/dist/css/bootstrap.min.css';
/* import the fontawesome core */

/* import font awesome icon component */
import '@fortawesome/fontawesome-free/css/all.min.css';


// Import Bootstrap and jQuery directly from npm
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import $ from 'jquery'; // jQuery
import 'datatables.net-dt/js/dataTables.dataTables.min.mjs';
// AdminLTE JS

/* eslint-enable */
// Vue app creation
const app = createApp(App);

app.use(router);
app.use(Toast);

// Set global properties
app.config.globalProperties.$logoName = 'Vue3 Admin Panel';

// Mount the Vue app
app.mount('#app');

// Ensure AdminLTE is initialized after each route change
router.afterEach(() => {
  setTimeout(() => {
    if (typeof $.fn.Layout === 'function') {
      $('body').Layout();
    }
    if (typeof $.fn.PushMenu === 'function') {
      $('[data-widget="pushmenu"]').PushMenu();
    }
  }, 0);
});
