import axios from "axios";
import { useEffect } from "react";

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
      // if (response.status === 401) {
      //   alert("You are not authorized");
      // }
      return response;
    },
    (error) => {
      if (error?.code === "ECONNREFUSED") {
        return Promise.reject("Terjadi pada kesalahan server");
        // return (window.location.href = "/authentication/login");
      }
      if (error?.response?.status === 401) {
        // return Promise.reject(
        //   "Silahkan login kembali, masa token anda sudah habis"
        // );
        // return (window.location.href = "/authentication/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default ServiceAdapter;
