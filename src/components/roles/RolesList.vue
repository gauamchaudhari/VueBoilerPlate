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
                  <i class="fa-solid fa-user"></i> Roles Management
                </h3>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary">
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
                        id="rolesTable"
                        class="table data-table table-striped table-bordered table-hover table-order-column"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
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
import { useToast } from "vue-toastification";
import AuthService from "@/services/authService";
import { showAlert as showSweetAlert } from "@/plugins/sweetalert2-config";
import $ from "jquery";
import "datatables.net";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const initDataTable = (data) => {
  $(document).ready(function () {
    const table = $("#rolesTable").DataTable({
      data: data,
      order: [[0, "desc"]],
      columns: [
        { data: "id" },
        { data: "name" },
        { data: "created_at" },
        {
          data: null,
          defaultContent:
            '<div class="icon-container"><i class="fa-solid fa-pen-to-square icon-edit"></i> <i class="fa-sharp-duotone fa-solid fa-trash icon-delete"></i></div>',
          orderable: true,
        },
      ],
      destroy: true,
    });

    $("#rolesTable tbody").on("click", ".icon-edit", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        editRole(rowData.id);
      } else {
        toast.error("No row data found for edit action.");
      }
    });

    $("#rolesTable tbody").on("click", ".icon-delete", (event) => {
      const rowData = table.row($(event.currentTarget).parents("tr")).data();
      if (rowData) {
        showConfirmationDialog(rowData.id);
      } else {
        toast.error("No row data found for delete action.");
      }
    });
  });
};

const fetchRoles = async () => {
  try {
    const response = await AuthService.roles();
    const data = await response.data;

    if ($.fn.dataTable.isDataTable("#rolesTable")) {
      $("#rolesTable").DataTable().clear().destroy();
      $("#rolesTable").empty();
    }
    initDataTable(data);
  } catch (error) {
    toast.error(error.message);
  }
};

onMounted(() => {
  fetchRoles();
});

onBeforeUnmount(() => {
  if ($.fn.dataTable.isDataTable("#rolesTable")) {
    $("#rolesTable").DataTable().clear().destroy();
  }
});

const editRole = (roleId) => {
  try {
    router.push({ name: "RoleEdit", params: { id: roleId } });
  } catch (error) {
    toast.error("Navigation error on edit role.");
  }
};

const showConfirmationDialog = async (roleId) => {
  try {
    const result = await showSweetAlert({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.value) {
      deleteRole(roleId);
    }
  } catch (error) {
    toast.error("Error showing confirmation dialog.");
  }
};

const deleteRole = async (roleId) => {
  try {
    await AuthService.deleteRole(roleId);
    toast.success("Role deleted successfully");
    fetchRoles();
  } catch (error) {
    toast.error("Error deleting role.");
  }
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
