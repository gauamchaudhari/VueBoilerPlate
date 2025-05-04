<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-custom">
    <button class="navbar-toggler d-lg-none" type="button" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a
            class="nav-link active text-blue fw-bold"
            aria-current="page"
            href="#"
            @click="toggleSidebar"
          >
            <i class="fas fa-bars"></i> Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-blue fw-bold" href="#">
            <i class="fa-solid fa-user"></i> All Users
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-blue fw-bold" href="#">Pricing</a>
        </li>
      </ul>

      <!-- Profile Dropdown -->
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-blue fw-bold"
            href="#"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-user-tie"></i> Profile
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <a class="dropdown-item menu-item" href="#">
                <i class="fa-solid fa-user"></i> My Profile
              </a>
            </li>
            <li>
              <a class="dropdown-item menu-item" href="#">
                <i class="fa-solid fa-gear"></i> Settings
              </a>
            </li>
            <li>
              <a class="dropdown-item menu-item" href="#" @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { logoutMixin } from "@/mixins/logoutMixin";
import { defineEmits } from "vue";
// Define the emit event
const emit = defineEmits(["toggle-sidebar"]);
const { logout } = logoutMixin.setup();
const toggleSidebar = () => {
  emit("toggle-sidebar");
};
</script>

<style scoped>
.nav-link {
  margin-left: 270px;
}
.bg-custom {
  background-color: #fdfdfd;
  color: #010c0e;
}
.menu-item:hover {
  background-color: #010c0e;
  color: 9c9fa6;
  border-radius: 4px;
  cursor: pointer;
}
</style>
