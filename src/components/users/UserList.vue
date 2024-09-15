<template>
  <div class="content-wrapper" style="min-height: 140px">
    <section class="content-header">
      <div class="container-fluid">
       
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="fa-solid fa-user"></i> Users Management</h3>
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

<script>
import $ from "jquery";
import "datatables.net";
import AuthService from "@/services/authService";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  name: "UserList",

  mounted() {
    this.fetchUsers();
  },
  beforeUnmount() {
    // Ensure the DataTable is destroyed before the component is unmounted
    if ($.fn.dataTable.isDataTable("#usersTable")) {
      $("#usersTable").DataTable().clear().destroy();
    }
  },
  setup() {
    const router = useRouter();

    const navigateToCreate = () => {
      router.push({ name: "UserCreate" });
    };

    return {
      navigateToCreate,
    };
  },
  data() {
    return {
      modalTitle: "",
      modalFields: [],
      isModalOpen: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await AuthService.users();
        const data = await response.data;

        // Ensure the DataTable is destroyed before initializing a new one
        if ($.fn.dataTable.isDataTable("#usersTable")) {
          $("#usersTable").DataTable().clear().destroy();
          // Manually remove the added DataTable wrappers
          $("#usersTable").empty();
        }

        this.initDataTable(data);
      } catch (error) {
        toast.error(error.message);
      }
    },
    initDataTable(data) {
      $(document).ready(function () {
        $("#usersTable").DataTable({
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
          destroy: true, // Ensure the previous instance is destroyed
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
