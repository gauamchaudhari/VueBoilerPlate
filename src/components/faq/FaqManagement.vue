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
                  <i class="fa-solid fa-user"></i> FAQ Management
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
                            <th>Questions</th>
                            <th>Answer</th>
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
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {});

const navigateToCreate = () => {
  router.push({ name: "FaqCreate" });
};
</script>
