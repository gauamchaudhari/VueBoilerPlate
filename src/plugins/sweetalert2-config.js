import Swal from 'sweetalert2';

// Example of a global configuration (optional)
const defaultOptions = {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    icon: 'info', // Default icon if not provided
};

export const showAlert = (options = {}) => {
    return Swal.fire({
        ...defaultOptions,
        ...options
    });
};