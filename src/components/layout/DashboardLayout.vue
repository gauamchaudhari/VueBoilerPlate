<template>
  <div>
    <DashboardNavbar @toggle-sidebar="toggleSidebar" />
    <div class="d-flex">
      <DashboardSidebar :isVisible="isSidebarVisible" />
      <div id="main-content" class="flex-grow-1 p-3">
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
  },
};
</script>

<style scoped>
#main-content {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
</style>
