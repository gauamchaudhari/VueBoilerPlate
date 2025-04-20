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
                    class="form-control w-75 permission-select"
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
const assignedPermissions = ref([]);

onMounted(async () => {
  const roleId = route.params.id;

  try {
    const roleResponse = await AuthService.getRole(roleId);
    role.value = roleResponse.data;

    const permissionsResponse = await AuthService.permissions();
    permissionsOptions.value = permissionsResponse.data.map((p) => ({
      value: p.id,
      label: p.name,
    }));

    // Load selected permission from localStorage
    const stored = localStorage.getItem(`assigned_permissions_role_${roleId}`);

    if (stored) {
      try {
        // Extract only the permission IDs (assuming stored is an array of objects)
        const permissions = JSON.parse(stored);
        selectedPermissions.value = permissions.map((permission) => permission.id);
        permissionMode.value = "custom";
      } catch (parseError) {
        console.error("Error parsing selectedPermissions:", parseError);
        selectedPermissions.value = [];
      }
    }
  } catch (error) {
    toast.error("Error loading role or permissions.");
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
  if (selectedPermissions.value.length === 0) {
    toast.error("No permissions selected.");
    return;
  }

  const formData = {
    role_id: route.params.id,
    permissions_id: selectedPermissions.value,
  };

  AuthService.assignRolePermissions(formData)
    .then((response) => {
      console.log("Response from server:", response);

      // Adjusting to the correct response structure
      if (
        response.data &&
        response.data.data &&
        response.data.data.assigned_permissions
      ) {
        const assignedIds = response.data.data.assigned_permissions;
        assignedPermissions.value = assignedIds;

        // Save to localStorage for persistence
        localStorage.setItem(
          `assigned_permissions_role_${formData.role_id}`,
          JSON.stringify(assignedIds)
        );

        toast.success("Permissions assigned successfully.");
        router.push({ name: "RolePermission" });
      } else {
        console.error("Invalid response structure:", response);
        toast.error("Error: Invalid response from server.");
      }
    })
    .catch((error) => {
      console.error("Error assigning permissions:", error);
      toast.error("Error assigning permissions.");
    });
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

select.permission-select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #aec4b1;
  transition: border-color 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  color: #495057;
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
