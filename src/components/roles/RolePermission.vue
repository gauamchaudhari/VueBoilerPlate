<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content">
      <div class="container-fluid">
        <div class="card card-outline card-primary mx-auto" style="max-width: 800px">
          <div class="card-header text-center text-primary fw-bold">
            <i class="fa-solid fa-users-cog"></i>&nbsp; Role Permissions
          </div>
          <div class="card-body">
            <VForm @submit="handleSubmit" :validation-schema="validationSchema">
              <div class="col-12 text-center">
                <div
                  class="form-group d-flex justify-content-center align-items-center mb-4"
                >
                  <label for="role" class="me-3">
                    Role<span class="text-danger">*</span>
                  </label>
                  <Field
                    name="name"
                    as="input"
                    type="text"
                    class="form-control w-75"
                    v-model="role.name"
                    placeholder="Role Name"
                  />
                  <ErrorMessage name="name" class="text-danger ms-3" />
                </div>

                <div
                  class="form-group d-flex justify-content-center align-items-center mb-4"
                >
                  <label for="permissions" class="me-3">
                    Associated Permissions<span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="permissionMode"
                    @change="handlePermissionMode"
                    class="form-control w-75"
                  >
                    <option value="all">Select All</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <!-- Checkbox list shown only if "Custom" is selected -->
                <div v-if="permissionMode === 'custom'" class="form-group">
                  <div
                    v-for="option in permissionsOptions"
                    :key="option.value"
                    class="form-check"
                  >
                    <input
                      type="checkbox"
                      :value="option.value"
                      v-model="selectedPermissions"
                      class="form-check-input"
                      :id="`permission-${option.value}`"
                    />
                    <label
                      :for="`permission-${option.value}`"
                      class="form-check-label permission-label"
                    >
                      {{ option.label }}
                    </label>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-12 text-center">
                    <button type="submit" class="btn btn-primary btn-lg">
                      Assign Permission
                    </button>
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

const toast = useToast();
const router = useRouter();
const route = useRoute();
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const role = ref({ name: "" });
const permissionsOptions = ref([]);
const selectedPermissions = ref([]);
const permissionMode = ref("custom");

onMounted(async () => {
  try {
    const roleId = route.params.id;
    const response = await AuthService.getRole(roleId);
    role.value = response.data;

    const permissionsData = await AuthService.permissions();
    permissionsOptions.value = permissionsData.data.map((permission) => ({
      value: permission.id,
      label: permission.name,
    }));
  } catch (error) {
    console.error("Error fetching role details:", error);
    toast.error("Error fetching role details.");
  }
});

const handlePermissionMode = () => {
  if (permissionMode.value === "all") {
    selectedPermissions.value = permissionsOptions.value.map((option) => option.value);
  } else {
    selectedPermissions.value = [];
  }
};

const handleSubmit = () => {
  const roleId = route.params.id;
  const assignedPermissions = selectedPermissions.value;
  console.log("Role ID:", roleId);
  console.log("Selected Permission IDs:", assignedPermissions);
};

const closeButton = () => {
  router.push({ name: "RolesList" });
};
</script>
<style>
/* Reduce space between checkbox and label */
.permission-label {
  margin-left: 5px; /* Adjust as necessary */
}

/* Remove border and scroll from dropdown */
select.form-control {
  border: none; /* Remove border */
  box-shadow: none; /* Remove any shadow effect */
  overflow-y: hidden; /* Remove scrollbar */
}
.form-check {
  display: flex !important; /* Keep each checkbox on a new line */
  margin-bottom: 0.5rem; /* Adjust bottom margin for spacing between options */
  padding-left: 0; /* Remove any padding */
}
/* Optional: Style the select dropdown to remove dropdown shadow if needed */
select.form-control:focus {
  border: none; /* Keep focus border removed */
  box-shadow: none;
}
/* Remove space between checkbox and label */
.form-check-input {
  margin-right: 5px; /* Adjust space between checkbox and label */
  vertical-align: middle; /* Vertically align the checkbox */
}

/* Ensure the label has no margin */
.permission-label {
  margin-left: 0; /* Remove left margin */
}
</style>
