import Vue from 'vue';
import { errorToaster } from "./../services/errorToaster.service"

/*
* Centralize error toast side-effects for non-http errors
*/
const genericErrorMessage = "Something went wrong"

// vue component error
Vue.config.errorHandler = (err, vm, info) => {
    console.log({err, vm, info})
    errorToaster.show(genericErrorMessage)
};

// unhandled exceptions from non-vue component
window.onerror = function(message, source, lineno, colno, error) {

    console.log({message, source, lineno, colno, error})
    errorToaster.show(genericErrorMessage)
};
