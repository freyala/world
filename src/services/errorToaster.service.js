import { createToastInterface } from "vue-toastification";

const toaster = createToastInterface();

class ErrorToaster {
  constructor(toast) {
    this.initToaster(toast);
  }

  initToaster(toast) {
    this.show = toast.error.bind(toast)
  }
}

/** Creating the instance of logger */
const errorToaster = new ErrorToaster(toaster);

export { errorToaster };
