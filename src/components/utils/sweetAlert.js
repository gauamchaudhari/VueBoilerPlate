import { showAlert as showSweetAlert } from "@/plugins/sweetalert2-config";

export const sweetAlert = async (options) => {
    try {
        const result = await showSweetAlert({
            title: options.title || "Are you sure?",
            text: options.text || "You won't be able to revert this!",
            icon: options.icon || "info",
            showCancelButton: true,
            confirmButtonColor: options.confirmButtonColor || "#3085d6",
            cancelButtonColor: options.cancelButtonColor || "#d33",
            confirmButtonText: options.confirmButtonText || "Yes, delete it!",
            cancelButtonText: options.cancelButtonText || "No, cancel!",
        });
        return result.isConfirmed;
    } catch (error) {
        console.error("Error showing confirmation dialog", error);
        return false;
    }
};