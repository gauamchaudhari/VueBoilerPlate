<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content">
      <div class="container-fluid">
        <div class="card card-outline card-primary">
          <div class="card-header text-center text-success fw-bold">
            <i class="fa-solid fa-users-cog"></i>&nbsp; Edit Role
          </div>
          <div class="card-body">
            <VForm @submit="handleSubmit" :validation-schema="validationSchema">
              <div class="col-12">
                <div class="row">
                  <div class="form-group">
                    <Field
                      name="name"
                      as="input"
                      type="text"
                      class="form-control"
                      v-model="role.name"
                      placeholder="Role Name"
                    />
                    <ErrorMessage name="name" class="text-danger mt-1" />
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

const toast = useToast();
const router = useRouter();
const route = useRoute();

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const role = ref({
  name: "",
});

onMounted(async () => {
  try {
    const roleId = route.params.id;
    const response = await AuthService.getRole(roleId);
    role.value = response.data;
  } catch (error) {
    console.error("Error fetching role details:", error);
    toast.error("Error fetching role details.");
  }
});

const handleSubmit = async (values) => {
  try {
    await AuthService.updateRole(route.params.id, values);
    toast.success("Role updated successfully.");
    router.push({ name: "RolesList" });
  } catch (error) {
    console.error("Error updating role:", error);
    toast.error("Error updating role.");
  }
};

const closeButton = () => {
  router.push({ name: "RolesList" });
};
</script>
