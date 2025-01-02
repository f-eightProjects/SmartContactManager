console.log("Contacts.js");
const baseURL = "http://localhost:8081";

// Get modal element and ensure it exists
const viewContactModal = document.getElementById("view_contact_modal");
if (!viewContactModal) {
    console.error("Modal element not found!");
}

// Modal configuration options
const options = {
    placement: "bottom-right",
    backdrop: "dynamic",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    closable: true,
    onHide: () => {
        console.log("modal is hidden");
        // Ensure proper cleanup
        if (viewContactModal) {
            viewContactModal.classList.remove("scale-100");
        }
    },
    onShow: () => {
        // Use requestAnimationFrame for better animation handling
        requestAnimationFrame(() => {
            if (viewContactModal) {
                viewContactModal.classList.add("scale-100");
            }
        });
    },
    onToggle: () => {
        console.log("modal has been toggled");
    }
};

// Instance options with corrected ID
const instanceOptions = {
    id: "view_contact_modal", // Fixed typo in 'modal'
    override: true
};

// Initialize modal only if element exists
let contactModal;
if (viewContactModal) {
    try {
        contactModal = new Modal(viewContactModal, options, instanceOptions);
    } catch (error) {
        console.error("Error initializing modal:", error);
    }
}

function openContactModal() {
    if (contactModal) {
        contactModal.show();
    } else {
        console.error("Modal not properly initialized");
    }
}

function closeContactModal() {
    if (contactModal) {
        contactModal.hide();
    }
}

async function loadContactData(id) { // Fixed function name casing
    if (!id) {
        console.error("Contact ID is required");
        return;
    }

    try {
        const response = await fetch(`${baseURL}/api/contacts/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Contact data:", data);

        // Helper function to safely update DOM elements
        const updateElement = (selector, value) => {
            const element = document.querySelector(selector);
            if (element) {
                if (selector.includes('href')) {
                    element.href = value;
                }
                element.innerHTML = value;
            } else {
                console.warn(`Element not found: ${selector}`);
            }
        };

        // Update contact information
        updateElement("#contact_name", data.name);
        updateElement("#contact_email", data.email);
        
        // Update contact image if it exists
        const imageElement = document.querySelector("#contact_image");
        if (imageElement && data.picture) {
            imageElement.src = data.picture;
            imageElement.alt = `${data.name}'s picture`;
        }

        updateElement("#contact_address", data.address);
        updateElement("#contact_phone", data.phoneNumber);
        updateElement("#contact_about", data.description);

        // Update favorite status
        const contactFavorite = document.querySelector("#contact_favorite");
        if (contactFavorite) {
            contactFavorite.innerHTML = data.favorite 
                ? '<i class="fas fa-star text-yellow-400"></i>'.repeat(5)
                : "Not Favorite Contact";
        }

        // Update links
        if (data.websiteLink) {
            updateElement("#contact_website", data.websiteLink);
            const websiteElement = document.querySelector("#contact_website");
            if (websiteElement) websiteElement.href = data.websiteLink;
        }

        if (data.linkedInLink) {
            updateElement("#contact_linkedIn", data.linkedInLink);
            const linkedInElement = document.querySelector("#contact_linkedIn");
            if (linkedInElement) linkedInElement.href = data.linkedInLink;
        }

        openContactModal();
    } catch (error) {
        console.error("Error loading contact data:", error);
        // Optionally show user-friendly error message
        Swal.fire({
            title: 'Error',
            text: 'Failed to load contact information',
            icon: 'error'
        });
    }
}

async function deleteContact(id) {
    if (!id) {
        console.error("Contact ID is required for deletion");
        return;
    }

    try {
        const result = await Swal.fire({
            title: "Do you want to delete the contact?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        });

        if (result.isConfirmed) {
            const url = `${baseURL}/user/contacts/delete/${id}`;
            window.location.replace(url);
        }
    } catch (error) {
        console.error("Error in delete operation:", error);
    }
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openContactModal,
        closeContactModal,
        loadContactData,
        deleteContact
    };
}