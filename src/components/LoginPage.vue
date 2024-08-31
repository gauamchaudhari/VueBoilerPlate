<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo text-color">
        <a href="#"><b>{{ $logoName }}</b></a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form @submit.prevent="handleLogin">
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
                required
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
                required
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember"> Remember Me </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </div>
              <!-- /.col -->
            </div>
          </form>

          <p class="mb-1">
            <a href="#">I forgot my password</a>
          </p>
          <p class="mb-0">
            <router-link to="/register" class="text-center"
              >Register a new membership</router-link
            >
          </p>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  // Add login logic here, such as authentication with an API
  console.log("Email:", email.value, "Password:", password.value);
};
</script>

<style scoped>
body {
  height: 100vh;
}
.text-color {
    color: rgba(var(--bs-success-rgb), var(--bs-text-opacity)) !important;
}
.login-page {
  background-color: #f4f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-box {
  width: 360px;
}

.login-logo a {
  font-size: 2.1rem;
  font-weight: 300;
}

.login-card-body {
  padding: 20px;
}

.icheck-primary {
  display: flex;
  align-items: center;
}
</style>
