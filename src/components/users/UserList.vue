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
                        class="table data-table table-striped table-bordered table-hover table-order-column"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
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
                            <th>ID</th>
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
import { showAlert as showSweetAlert } from "@/plugins/sweetalert2-config";
import AuthService from "@/services/authService";
import $ from "jquery";
import "datatables.net";

const toast = useToast();
const router = useRouter();
const showConfirmationDialog = async (userId) => {
    console.log("showConfirmationDialog called with userId:", userId);
    try {
        const result = await showSweetAlert({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning', // Ensure this is a valid icon
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        console.log("SweetAlert result:", result);

        if (result.value) {
            console.log("User confirmed deletion");
            deleteUser(userId);
        }
    } catch (error) {
        toast.error("Error showing confirmation dialog.");
    }
};

const deleteUser = async (userId) => {
  try {
    await AuthService.deleteUser(userId); // Make sure you have a method to handle deletion
    toast.success("User deleted successfully.");
    fetchUsers(); // Refresh the list
  } catch (error) {
    toast.error("Error deleting user.");
  }
};

const fetchUsers = async () => {
  try {
    const response = await AuthService.users();
    const data = await response.data;
    // Ensure the DataTable is destroyed before initializing a new one
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
        { data: "id" },
        { data: "first_name" },
        { data: "last_name" },
        { data: "email" },
        { data: "phone" },
        { data: "address" },
        { data: "gender" },
        {
          data: null,
          defaultContent:
            '<div class="icon-container"><i class="fa-solid fa-pen-to-square icon-edit"></i> <i class="fa-sharp-duotone fa-solid fa-trash icon-delete"></i></div>',
          orderable: true,
        },
      ],
      destroy: true,
    });

    // Handle edit button click
    $("#usersTable tbody").on("click", ".icon-edit", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        editUser(rowData.id); // Call the method in the Vue instance
      } else {
        toast.error("No row data found for edit action.");
      }
    });
    //Handle delete button click
    $("#usersTable tbody").on("click", ".icon-delete", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        showConfirmationDialog(rowData.id);
      } else {
        toast.error("No row data found for delete action.");
      }
    });
  });
};

const editUser = (userId) => {
  try {
    // Navigate to the edit page and pass the user ID as a param
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
</script>

<style>
.icon-container {
  display: flex;
  gap: 30px;
}
.icon-edit,
.icon-delete {
  font-size: 20px;
}
.icon-edit {
  color: #007bff;
}
.icon-delete {
  color: #dc3545;
}
</style>
