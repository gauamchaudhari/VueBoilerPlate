<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content">
      <div class="container-fluid">
        <div class="card card-outline card-primary">
          <div class="card-header text-center text-success fw-bold">
            <i class="fa-solid fa-users-cog"></i>&nbsp; Edit User
          </div>
          <div class="card-body">
            <VForm @submit="handleSubmit" :validation-schema="validationSchema">
              <div class="col-12">
                <div class="row">
                  <div class="form-group">
                    <Field
                      name="first_name"
                      as="input"
                      type="text"
                      class="form-control"
                      v-model="user.first_name"
                      placeholder="First Name"
                    />
                    <ErrorMessage name="first_name" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <Field
                      name="last_name"
                      as="input"
                      type="text"
                      class="form-control"
                      v-model="user.last_name"
                      placeholder="Last Name"
                    />
                    <ErrorMessage name="last_name" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <Field
                      name="email"
                      as="input"
                      type="email"
                      class="form-control"
                      v-model="user.email"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" class="text-danger mt-1" />
                  </div>
                  <div class="form-group">
                    <Field
                      name="address"
                      as="input"
                      type="text"
                      class="form-control"
                      v-model="user.address"
                      placeholder="Address"
                    />
                    <ErrorMessage name="address" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <Field
                      name="phone"
                      as="input"
                      type="tel"
                      class="form-control"
                      v-model="user.phone"
                      placeholder="Phone"
                    />
                    <ErrorMessage name="phone" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <label>Gender</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <Field
                          name="gender"
                          as="input"
                          type="radio"
                          value="female"
                          v-model="user.gender"
                          class="form-check-input"
                          id="female"
                        />
                        <label class="form-check-label" for="female">Female</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <Field
                          name="gender"
                          as="input"
                          type="radio"
                          value="male"
                          class="form-check-input"
                          v-model="user.gender"
                          id="male"
                        />
                        <label class="form-check-label" for="male">Male</label>
                      </div>
                    </div>
                    <ErrorMessage name="gender" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <label for="education">Education</label>
                    <Field
                      name="education"
                      as="select"
                      class="form-control"
                      v-model="user.education"
                      id="education"
                    >
                      <option value="" disabled>Select your education</option>
                      <option value="BA">BA</option>
                      <option value="BSc">BSc</option>
                      <option value="BCom">BCom</option>
                      <option value="BTech">BTech</option>
                      <option value="MSc">MSc</option>
                      <option value="MBA">MBA</option>
                    </Field>
                    <ErrorMessage name="education" class="text-danger mt-1" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 text-center">
                    <button type="submit" class="btn btn-primary btn-lg">Update</button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-lg"
                      @click="closeButton"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </VForm>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Field, Form as VForm, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import AuthService from "@/services/authService";
import { useToast } from "vue-toastification";

// Toast for notifications
const toast = useToast();
const router = useRouter();
const route = useRoute();

// Define the validation schema
const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  gender: Yup.string().required("Gender is required"),
  education: Yup.string().required("Education is required"),
});

// Define reactive user object
const user = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  education: "",
});

// Fetch user data on mount
onMounted(async () => {
  try {
    const userId = route.params.id;
    const response = await AuthService.getUser(userId);
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("Error fetching user details.");
  }
});

// Handle form submission
const handleSubmit = async (values) => {
  try {
    await AuthService.updateUser(route.params.id, values);
    toast.success("User updated successfully.");
    router.push({ name: "UserList" });
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Error updating user.");
  }
};

// Handle close button
const closeButton = () => {
  router.push({ name: "UserList" });
};
</script>
