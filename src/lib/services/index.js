import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API_LOCAL;

function ServiceAdapter() {
  // return axios.create({
  //   baseURL: BASE_API,
  //   responseType: "json",
  // });

  const instance = axios.create({
    baseURL: BASE_API,
    responseType: "json",
  });

  //validate response
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        return (window.location.href = "/authentication/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default ServiceAdapter;
