import { useToast } from "vue-toastification"

export const toaster = {
    data: function () {
        return {
            toaster: useToast(),
            toasterTimeout: 2000
        }
    },
    methods: {
        displayError() {
            this.toaster.error(message, this.toasterTimeout)
        },
        displayWarning() {
            this.toaster.warning(message, this.toasterTimeout)
        },
        displayInfo() {
            this.toaster.info(message, this.toasterTimeout)
        },
        displaySuccess(message) {
            this.toaster.success(message, this.toasterTimeout)
        }
    }
}