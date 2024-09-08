<template>
  <nav class="main-header navbar navbar-expand navbar-dark bg-dark">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/users" class="nav-link">All Users</router-link>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">User: {{ userEmail }}</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Add navbar items here -->
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      userEmail: "",
    };
  },
  created() {
    // Retrieve user email from localStorage
    this.userEmail = localStorage.getItem("userEmail") || "Guest";
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      this.$router.push("/");
    },
  },
};
</script>
