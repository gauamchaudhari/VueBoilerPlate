<template>
  <div class="hold-transition register-page">
    <div class="register-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center text-success">
          <a href="#" class="h1"><b>{{ $logoName }}</b></a>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Register a new membership</p>
          <VForm @submit="handleSubmit" :validation-schema="validationSchema">
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
              <Field name="education" as="select" class="form-control" id="education">
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

            <div class="row">
              <div class="col-12 text-center">
                <button type="submit" class="btn btn-primary btn-lg">Register</button>
              </div>
            </div>
          </VForm>

          <a href="/" class="text-center">I already have a membership</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
    Field, 
    Form as VForm, 
    ErrorMessage 
  } from "vee-validate";
  import * as yup from "yup";

// Define your form validation schema
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

// Form submission handler
const handleSubmit = (values) => {
  console.log("Form submitted successfully", values);
  // Add your form submission logic here
};
</script>

<style scoped>
.text-danger {
  color: #dc3545; /* Bootstrap text-danger color */
}

.mt-1 {
  margin-top: 0.25rem; /* Margin-top for spacing below error messages */
}

.form-group {
  margin-bottom: 1rem; /* Space between form groups */
}

.register-box {
  width: 100%;
  max-width: 600px; /* Set the maximum width */
  margin: auto;
}

.card-body {
  padding: 2rem; /* Increase padding for more space */
}

.btn-lg {
  font-size: 1.25rem; /* Larger button text */
  padding: 0.75rem 1.25rem; /* Larger button padding */
}
</style>
