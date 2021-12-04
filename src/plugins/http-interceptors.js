import { createToastInterface } from "vue-toastification";


// Centralize toast side effects for http errors
const toast = createToastInterface();

const onResponse = (response) => {
  return response;
};

const formatErrorMessage = (errorResponse) => {
  if(errorResponse?.status && errorResponse?.statusText) return `Error ${errorResponse.status} : ${errorResponse.statusText}`
  if(errorResponse?.status) return `Error ${errorResponse.status}`
  return "Network error"
}

const onResponseError = (error) => {
  toast.error(formatErrorMessage(error?.response))
  return Promise.reject(error);
};

export function addInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
