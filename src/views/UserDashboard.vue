<!-- src/views/Dashboard.vue -->
<template>
  <div class="content-wrapper">
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>150</h3>
                <p>New Orders</p>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>53<sup style="font-size: 20px">%</sup></h3>
                <p>Bounce Rate</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>44</h3>
                <p>User Registrations</p>
              </div>
              <div class="icon">
                <i class="ion ion-person-add"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>65</h3>
                <p>Unique Visitors</p>
              </div>
              <div class="icon">
                <i class="ion ion-pie-graph"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- Example of a card with a chart -->
          <div class="col-lg-6 col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Sales Overview</h3>
              </div>
              <div class="card-body">
                <div class="chart">
                  <!-- Example chart placeholder -->
                  <canvas id="salesChart" width="400" height="200"></canvas>
                </div>
              </div>
            </div>
          </div>
          <!-- Another example card -->
          <div class="col-lg-6 col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Recent Activity</h3>
              </div>
              <div class="card-body">
                <ul class="list-unstyled">
                  <li><i class="fas fa-check"></i> Activity 1</li>
                  <li><i class="fas fa-check"></i> Activity 2</li>
                  <!-- Add more activities here -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// You can use libraries like Chart.js to render charts
import { onMounted } from "vue";
import Chart from "chart.js/auto";

onMounted(() => {
  new Chart(document.getElementById("salesChart"), {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          label: "Sales",
          data: [12, 19, 3, 5],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
  });
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
