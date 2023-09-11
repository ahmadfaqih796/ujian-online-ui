import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => await axios.get(url);

export const useUserSession = (options) => {
  const { data, error } = useSWR("/api/auth/user", fetcher);
  // if (error) {
  //   return (window.location.href = "/authentication/login");
  // }

  if (options === "simple") {
    const newData = {
      fullname: data?.data?.name,
      // photo: data?.data?.photo,
    };

    return {
      data: newData,
      error: error,
    };
  }
  return {
    data: data,
    error: error,
  };
};
