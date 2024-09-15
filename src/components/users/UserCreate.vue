<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content">
      <div class="container-fluid">
        <div class="card card-outline card-primary">
          <div class="card-header text-center text-success fw-bold">
            <i class="fa-solid fa-users-cog"></i>&nbsp; Create User
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
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <Field
                      name="password"
                      as="input"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" class="text-danger mt-1" />
                  </div>

                  <div class="form-group">
                    <Field
                      name="address"
                      as="input"
                      type="text"
                      class="form-control"
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
                    <button type="submit" class="btn btn-primary btn-lg">Create</button
                    >&nbsp;
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
import { Field, Form as VForm, ErrorMessage } from "vee-validate";
import AuthService from "@/services/authService";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  gender: yup.string().required("Gender is required"),
  education: yup.string().required("Education is required"),
});

const handleSubmit = async (values) => {
  try {
    const response = await AuthService.register(values);
    console.log("Form submitted successfully:", response.data);
    toast.success("The user created successful!");
    router.push("/users");
  } catch (error) {
    const err = error.response ? error.response.data.errors[0].message : error.message;
    console.error(
      "Error submitting form:",
      error.response ? error.response.data : error.message
    );

    toast.error(err);
  }
};

const closeButton = async () => {
  router.push("/users");
};
</script>

<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-box {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
