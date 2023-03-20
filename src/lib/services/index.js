import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

function ServiceAdapter() {
  return axios.create({
    baseURL: BASE_API,
    responseType: "json",
  });
}

export default ServiceAdapter;
