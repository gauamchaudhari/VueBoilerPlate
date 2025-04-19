<template>
  <div>
    <DashboardNavbar @toggle-sidebar="toggleSidebar" />
    <div class="d-flex">
      <DashboardSidebar
        :isVisible="isSidebarVisible"
        @sidebar-toggled="handleSidebarToggle"
      />
      <div
        id="main-content"
        class="flex-grow-1 p-3"
        :class="{ 'sidebar-hidden': !isSidebarVisible }"
      >
        <router-view />
      </div>
    </div>
    <DashboardFooter />
  </div>
</template>

<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import DashboardSidebar from "./DashboardSidebar.vue";
import DashboardFooter from "./DashboardFooter.vue";

export default {
  name: "DashboardLayout",
  components: {
    DashboardNavbar,
    DashboardSidebar,
    DashboardFooter,
  },
  data() {
    return {
      isSidebarVisible: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleSidebarToggle(isCollapsed) {
      this.isSidebarVisible = !isCollapsed; // Update visibility based on collapsed state
    },
  },
};
</script>

<style scoped>
#main-content {
  flex-grow: 1;
  margin-left: 250px; /* Default sidebar width */
  transition: margin-left 0.3s ease;
}

#main-content.sidebar-hidden {
  margin-left: 80px; /* Collapsed sidebar width */
}

.content-wrapper {
  background-color: #f4f5f7; /* Light background */
  min-height: 100vh;
}
</style>
