<template>
  <footer class="text-center py-3 fixed-bottom text-white fw-bold">
    <p class="mb-0">© 2024 Vue3 Admin Panel. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "DashboardFooter",
};
</script>

<style scoped>
/* Ensure the footer is fixed at the bottom */
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 94.5%;
  width: 100%;
  z-index: 1000; /* Ensure it stays on top of other content */
  background-color: #010c0e;
}

/* Optional: Add padding to the body to avoid overlap */
body {
  padding-bottom: 3rem; /* Adjust based on footer height */
}
</style>
