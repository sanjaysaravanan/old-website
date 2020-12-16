import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const notificationInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  cancelToken: source.token
});
const res = function(response) {
  return response.data;
};
const error = function(error) {
  return Promise.reject(error);
};

notificationInstance.interceptors.response.use(res, error);

export { notificationInstance };
