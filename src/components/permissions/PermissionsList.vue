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
                  <i class="fa-solid fa-user"></i> Permissions Management
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
                        id="permissionsTable"
                        class="table data-table table-dark table-striped table-bordered table-hover table-order-column"
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
                        <tfoot>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Created At</th>
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
import { useToast } from "vue-toastification";
import AuthService from "@/services/authService";
import $ from "jquery";
import "datatables.net";

const toast = useToast();

const initDataTable = (data) => {
  $(document).ready(function () {
    $("#permissionsTable").DataTable({
      data: data,
      order: [[0, "desc"]],
      columns: [
        { data: "id" },
        { data: "name" },
        { data: "created_at" },
        {
          data: null,
          defaultContent:
            '<div class="icon-container"><i class="fa-solid text-white fa-pen-to-square icon-edit"></i> <i class="fa-sharp-duotone fa-solid fa-trash text-white icon-delete"></i></div>',
          orderable: true,
        },
      ],
      destroy: true,
    });
  });
};

const fetchPermissions = async () => {
  try {
    const response = await AuthService.permissions();
    const data = await response.data;

    if ($.fn.dataTable.isDataTable("#permissionsTable")) {
      $("#permissionsTable").DataTable().clear().destroy();
      $("#permissionsTable").empty();
    }
    initDataTable(data);
  } catch (error) {
    toast.error(error.message);
  }
};

onMounted(() => {
  fetchPermissions();
});

onBeforeUnmount(() => {
  if ($.fn.dataTable.isDataTable("#permissionsTable")) {
    $("#permissionsTable").DataTable().clear().destroy();
  }
});
</script>
