<template>
  <div :class="['bg-custom vh-100', { 'd-none': !isVisible, collapsed: isCollapsed }]">
    <div class="sidebar-content p-3">
      <h4>
        <i class="fa-solid fa-building-columns"></i>&nbsp;
        <span v-if="!isCollapsed">
          <svg
            width="120"
            height="40"
            viewBox="0 0 160 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #ff6a00; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #ffcc00; stop-opacity: 1" />
              </linearGradient>
            </defs>

            <!-- Spark text -->
            <text
              x="0"
              y="28"
              font-family="Arial, Helvetica, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="url(#sparkGradient)"
            >
              Spark
            </text>

            <!-- Spark icon replacing the 'k' -->
            <polygon
              points="70,10 73,20 60,15 75,15 63,20"
              fill="#ff6a00"
              transform="rotate(15 65 15)"
            />

            <!-- View text -->
            <text
              x="85"
              y="28"
              font-family="Arial, Helvetica, sans-serif"
              font-size="24"
              fill="#333"
            >
              View
            </text>
          </svg>
        </span>
      </h4>
      <hr />

      <!-- General Section -->
      <h6 class="text-uppercase fw-bold">General</h6>
      <ul class="nav flex-column mb-3">
        <li class="nav-item">
          <router-link
            class="nav-link text-black fw-bold menu-item"
            to="/dashboard"
            exact-active-class="active"
          >
            <i class="fa-solid fa-gauge"></i>&nbsp;&nbsp;
            <span v-if="!isCollapsed">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-black fw-bold menu-item" href="#">
            <i class="fa-solid fa-gear"></i>&nbsp;&nbsp;
            <span v-if="!isCollapsed">Settings</span>
          </a>
        </li>
      </ul>

      <!-- System Section -->
      <h6 class="text-uppercase fw-bold">System</h6>
      <ul class="nav flex-column">
        <!-- Dropdown for Access with border when active -->
        <li class="nav-item">
          <a
            class="nav-link d-flex justify-content-between text-black fw-bold menu-item"
            data-bs-toggle="collapse"
            href="#accessMenu"
            role="button"
            aria-expanded="false"
            aria-controls="accessMenu"
            :class="{ 'access-active': isAccessActive }"
            @click="toggleAccessActive"
          >
            <span>
              <i class="fa-solid fa-user-shield"></i>&nbsp;&nbsp;
              <span v-if="!isCollapsed">Access</span>
            </span>
            <i class="fa-solid fa-caret-down"></i>
          </a>
          <!-- Collapsible submenu -->
          <div class="collapse" id="accessMenu">
            <ul class="nav flex-column ms-3">
              <li class="nav-item">
                <router-link
                  class="nav-link fw-bold menu-item"
                  to="/users"
                  exact-active-class="active"
                >
                  <i class="fa-solid fa-users-cog"></i>&nbsp;&nbsp;
                  <span v-if="!isCollapsed">Users</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link fw-bold menu-item"
                  to="/roles"
                  exact-active-class="active"
                >
                  <i class="fa-solid fa-registered"></i>&nbsp;&nbsp;
                  <span v-if="!isCollapsed">Roles</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link fw-bold menu-item"
                  to="/permissions"
                  exact-active-class="active"
                >
                  <i class="fa-brands fa-product-hunt"></i>&nbsp;&nbsp;
                  <span v-if="!isCollapsed">Permissions</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-black fw-bold menu-item"
            to="/faq"
            exact-active-class="active"
          >
            <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
            <span v-if="!isCollapsed">Faq Management</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a class="nav-link text-black fw-bold menu-item" href="#">
            <i class="fa-solid fa-envelope"></i>&nbsp;&nbsp;
            <span v-if="!isCollapsed">Email Templates</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-black fw-bold menu-item" href="#">
            <i class="fa-solid fa-bars"></i>&nbsp;&nbsp;
            <span v-if="!isCollapsed">Log Viewer</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black fw-bold menu-item"
            href="#"
            @click="handleLogout()"
          >
            <i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;
            <span v-if="!isCollapsed">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import eventBus from "@/plugins/eventBus";
import { logoutMixin } from "@/mixins/logoutMixin";

export default {
  mixins: [logoutMixin],
  name: "DashboardSidebar",
  data() {
    return {
      isAccessActive: false, // To track if Access menu is active
      isCollapsed: false, // To track if sidebar is collapsed
    };
  },

  props: {
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggleAccessActive() {
      this.isAccessActive = !this.isAccessActive; // Toggle active state for Access
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed; // Toggle collapse state
      this.$emit("sidebar-toggled", this.isCollapsed);
    },
    handleLogout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    eventBus.on("toggle-sidebar", this.toggleSidebar);
  },
  beforeUnmount() {
    eventBus.off("toggle-sidebar", this.toggleSidebar);
  },
};
</script>

<style scoped>
/* Dark blue background for sidebar */
.bg-custom {
  background-color: #fdfdfd;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  transition: width 0.3s ease;
}

.d-none {
  display: none;
}

/* Sidebar collapsed style */
.collapsed {
  width: 80px;
  /* Adjust width for collapsed state */
}

/* Active link style */
.active {
  background-color: #fff;
  /* Darker purple */
  color: #b79595;
  border-radius: 4px;
  font-weight: bold;
}

.navbar {
  background-color: #fff;
  /* Purple */
  color: #b79595;
}

/* Section headings style */
h6 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
}

/* Style for collapsed submenus */
.collapse .nav-link {
  padding-left: 1.5rem;
  color: #b79595;
}

/* Add border and highlight to Access when active */
.access-active {
  border: 1px solid #11bee1;
  border-radius: 3px;
  background-color: #b79595;
}

/* Hover effect for menu items */
.menu-item:hover {
  background-color: #b79595;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
