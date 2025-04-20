<template>
  <div>
    <div class="container mt-5">
      <h2 class="text-center">Upload File</h2>
      <form @submit.prevent="uploadFile">
        <div class="mb-3">
          <label for="file" class="form-label fw-bold">Choose File</label>
          <input type="file" class="form-control" id="file" @change="handleFileUpload" />
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!selectedFile">
          Upload
        </button>
      </form>
    </div>
    <div class="container" style="display: block; max-width: 1000px">
      <hr />
      <h1 class="text-center">Uploaded Files</h1>

      <div class="row">
        <div class="col-md-4 mb-4" v-for="file in userFiles" :key="file.id">
          <div class="card file-card rounded-5 shadow-lg border-0 position-relative">
            <!-- Delete Icon -->
            <button
              class="delete-btn btn btn-danger btn-sm position-absolute"
              @click="deleteFile(file.id)"
              title="Delete File"
            >
              🗑️
            </button>

            <!-- Image -->
            <div class="card-img-container">
              <img
                :src="file.file_path"
                class="card-img-top rounded-top-5"
                alt="Uploaded file"
                @click="showImagePreview(file.file_path)"
                style="cursor: pointer"
              />
            </div>

            <!-- Card Body -->
            <div class="card-body text-center">
              <h5 class="card-title text-primary fw-bold">📁 {{ file.file_type }}</h5>
              <p class="card-text text-muted">
                Uploaded: {{ new Date(file.created_at).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Image Preview Modal -->
    <div
      class="modal fade"
      id="imagePreviewModal"
      tabindex="-1"
      aria-labelledby="imagePreviewModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div
          class="modal-content bg-dark border-0 text-white rounded-5 shadow-lg position-relative"
        >
          <div class="modal-header border-0">
            <h5 class="modal-title" id="imagePreviewModalLabel">Image Preview</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body d-flex justify-content-center align-items-center p-4">
            <!-- Left Arrow -->
            <button
              class="nav-arrow left-arrow"
              @click="prevImage"
              v-if="userFiles.length > 1"
            >
              ‹
            </button>

            <!-- Image -->
            <img :src="previewImage" class="img-fluid preview-img" alt="Preview" />

            <!-- Right Arrow -->
            <button
              class="nav-arrow right-arrow"
              @click="nextImage"
              v-if="userFiles.length > 1"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import AuthService from "@/services/authService";
import Modal from "bootstrap/js/dist/modal";
import { nextTick } from "vue";
const toast = useToast();
const route = useRoute();
// Reactive variables
const selectedFile = ref(null);
const uploadStatus = ref("");
const errorMessage = ref("");
const userFiles = ref([]);
const previewImage = ref("");
const currentIndex = ref(0);

onMounted(async () => {
  await fetchUserFiles();
});

const showImagePreview = async (url) => {
  const index = userFiles.value.findIndex((file) => file.file_path === url);
  if (index !== -1) {
    currentIndex.value = index;
    previewImage.value = userFiles.value[currentIndex.value].file_path;

    await nextTick(); // Ensures DOM is updated before accessing the modal
    const modalElement = document.getElementById("imagePreviewModal");
    const modal = new Modal(modalElement);
    modal.show();
  }
};

const nextImage = () => {
  if (currentIndex.value < userFiles.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Loop around
  }
  previewImage.value = userFiles.value[currentIndex.value].file_path;
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = userFiles.value.length - 1; // Loop around
  }
  previewImage.value = userFiles.value[currentIndex.value].file_path;
};

// Handle file selection
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    uploadStatus.value = "";
    errorMessage.value = "";
  }
};

// Simulate file upload
const uploadFile = async () => {
  if (!selectedFile.value) {
    toast.error("Please select a file to upload.");
    return;
  }

  try {
    // Simulate an API call
    const formData = new FormData();

    formData.append("image", selectedFile.value);
    formData.append("user_id", route.params.id);

    await AuthService.uploadFiles(formData);

    toast.success("File uploaded successfully!");

    uploadStatus.value = `File "${selectedFile.value.name}" uploaded successfully!`;
    selectedFile.value = null;
    await fetchUserFiles();
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const fetchUserFiles = async () => {
  try {
    const res = await AuthService.getUserFiles(route.params.id);
    userFiles.value = res.data.data;
    return userFiles.value;
  } catch (error) {
    toast.error("Error fetching files:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-img-container {
  overflow: hidden;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.file-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border-radius: 2rem;
}

.card-img-container {
  overflow: hidden;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.card-img-top {
  transition: transform 0.4s ease;
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.file-card:hover .card-img-top {
  transform: scale(1.05);
}

.delete-btn {
  top: 3px;
  right: 10px;
  z-index: 10;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-body img {
  max-height: 70vh;
  object-fit: contain;
}
.preview-img {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 1rem;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

.preview-img:hover {
  transform: scale(1.02);
}

.modal-content {
  background: #1e1e2f;
}

.modal-title {
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.nav-arrow:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.left-arrow {
  left: 20px;
}

.right-arrow {
  right: 20px;
}
</style>
