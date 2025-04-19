<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fa-solid fa-user"></i> Users Management
                </h3>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary" @click="navigateToCreate">
                    <i class="fa fa-plus"></i> Create!
                  </button>
                </div>
              </div>

              <div class="card-body">
                <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                  <div class="row">
                    <div class="col-sm-12 col-md-6"></div>
                    <div class="col-sm-12 col-md-6"></div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <table
                        id="usersTable"
                        class="table data-table table-bordered table-hover table-order-column"
                      >
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { sweetAlert } from "../utils/sweetAlert";
import AuthService from "@/services/authService";
import $ from "jquery";
import "datatables.net";

const toast = useToast();
const router = useRouter();

// Existing methods for user management
const showConfirmationDialog = async (userId) => {
  const isConfirmed = await sweetAlert({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  });
  if (isConfirmed) {
    deleteUser(userId);
  }
};

const deleteUser = async (userId) => {
  try {
    await AuthService.deleteUser(userId);
    toast.success("User deleted successfully.");
    fetchUsers();
  } catch (error) {
    toast.error("Error deleting user.");
  }
};

const fetchUsers = async () => {
  try {
    const response = await AuthService.users();
    const data = await response.data;
    if ($.fn.dataTable.isDataTable("#usersTable")) {
      $("#usersTable").DataTable().clear().destroy();
      $("#usersTable").empty();
    }
    initDataTable(data);
  } catch (error) {
    toast.error(error.message);
  }
};

const initDataTable = (data) => {
  $(document).ready(function () {
    const table = $("#usersTable").DataTable({
      data: data,
      order: [[0, "desc"]],
      columns: [
        { data: "first_name" },
        { data: "last_name" },
        { data: "email" },
        { data: "phone" },
        { data: "address" },
        { data: "gender" },
        {
          data: null,
          defaultContent:
            '<div class="icon-container"><i class="fa-solid fa-pen-to-square icon-edit"></i> <i class="fa-sharp-duotone fa-solid fa-trash icon-delete"></i> <i class="fa-solid fa-upload upload-btn"></i></div>',
          orderable: true,
        },
      ],
      destroy: true,
    });

    // Handle edit button click
    $("#usersTable tbody").on("click", ".icon-edit", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        editUser(rowData.id);
      } else {
        toast.error("No row data found for edit action.");
      }
    });

    // Handle delete button click
    $("#usersTable tbody").on("click", ".icon-delete", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        showConfirmationDialog(rowData.id);
      } else {
        toast.error("No row data found for delete action.");
      }
    });

    $("#usersTable tbody").on("click", ".upload-btn", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        navigateToUpload(rowData.id);
      } else {
        toast.error("No row data found for edit action.");
      }
    });
  });
};

const editUser = (userId) => {
  try {
    router.push({
      name: "UserEdit",
      params: { id: userId },
    });
  } catch (error) {
    toast.error("Error fetching user details.");
  }
};

onMounted(() => {
  fetchUsers();
});

onBeforeUnmount(() => {
  if ($.fn.dataTable.isDataTable("#usersTable")) {
    $("#usersTable").DataTable().clear().destroy();
  }
});

const navigateToCreate = () => {
  router.push({ name: "UserCreate" });
};

const navigateToUpload = (userId) => {
  try {
    router.push({
      name: "UploadFiles",
      params: { id: userId },
    });
  } catch (error) {
    toast.error("Error fetching user details.");
  }
};
</script>
