<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo text-color">
        <svg
          width="200"
          height="60"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: #ff6a00; stop-opacity: 1" />
              <stop offset="100%" style="stop-color: #ffcc00; stop-opacity: 1" />
            </linearGradient>
          </defs>
          <text
            x="10"
            y="40"
            font-family="Arial, Helvetica, sans-serif"
            font-size="32"
            font-weight="bold"
            fill="url(#sparkGradient)"
          >
            Spark
          </text>
          <text
            x="105"
            y="40"
            font-family="Arial, Helvetica, sans-serif"
            font-size="32"
            fill="#333"
          >
            View
          </text>
          <!-- Spark icon -->
          <polygon
            points="60,10 63,25 50,18 67,18 54,25"
            fill="#ff6a00"
            transform="rotate(15 60 18)"
          />
        </svg>
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg fw-bold">Sign in</p>

          <!-- VeeValidate Form -->
          <VForm :validation-schema="validationSchema" @submit="handleLogin">
            <!-- Email Field -->
            <div class="input-group mb-3">
              <Field
                name="email"
                as="input"
                type="email"
                class="form-control"
                placeholder="Email"
              />
              <ErrorMessage name="email" class="text-danger mt-1 error-message" />
            </div>

            <!-- Password Field -->
            <div class="input-group mb-3">
              <Field
                name="password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="text-danger mt-1" />
            </div>

            <!-- Submit Button -->
            <div class="row">
              <div class="col-4 offset-4">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          </VForm>

          <p class="mb-1">
            <a href="#">I forgot my password</a>
          </p>
          <p class="mb-0">
            <router-link to="/register" class="text-center"
              >Register a new membership</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@/assets/css/login.css";
import { Field, Form as VForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AuthService from "@/services/authService";
import { useRouter } from "vue-router";

const router = useRouter();

// Define the Yup schema
const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Handle form submission
const handleLogin = async (values) => {
  try {
    const response = await AuthService.login(values.email, values.password);
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userEmail", values.email);
      router.push("/dashboard");
    } else {
      console.error("Login failed:", response.message);
    }
  } catch (error) {
    console.error("API Error:", error);
  }
};
</script>
