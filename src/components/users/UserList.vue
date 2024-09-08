<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="text-center">
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users</h3>
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

<script>
import $ from "jquery";
import "datatables.net";
import AuthService from "@/services/authService";

export default {
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await AuthService.users();
        const data = await response.data;
        this.initDataTable(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    initDataTable(data) {
      $(document).ready(function () {
        $("#usersTable").DataTable({
          data: data,
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
              orderable: false,
            },
          ],
        });        
      });
    },
  },
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
