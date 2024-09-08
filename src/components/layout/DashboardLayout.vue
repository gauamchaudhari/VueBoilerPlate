<!-- src/components/layout/DashboardLayout.vue -->
<template>
  <div class="wrapper">
    <DashboardNavbar />
    <DashboardSidebar />
    <div class="content-wrapper">
      <router-view />
    </div>
    <DashboardFooter />
  </div>
</template>

<script setup>
import DashboardNavbar from '@/components/layout/DashboardNavbar.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import DashboardFooter from '@/components/layout/DashboardFooter.vue'
import { onMounted } from 'vue';
onMounted(() => {
  // Initialize AdminLTE JS functionality
  window.$(document).Toasts = window.$.Toasts;
});
</script>

<style scoped>
/* Add any custom styles here */
</style>

