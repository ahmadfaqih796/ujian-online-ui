import { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const useLogin = () => {
  const router = useRouter();
  const [state, setState] = useState({
    loading: false,
  });

  const handleLoading = (status) => {
    setState((prevState) => ({
      ...prevState,
      loading: status,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    handleLoading(true);

    const { target } = event;
    const { email, password } = target;

    const data = {
      email: email.value,
      password: password.value,
      strategy: "local",
    };

    try {
      const { data: res } = await Axios.post("/api/auth/login", data);

      // if (res.level.level === 1) {
      //   return router.replace("/apps/absent");
      // }
      console.log("anda berhasil login");
      router.replace("/admin/home");
    } catch (error) {
      handleLoading(false);
      alert(error?.response?.data.message);
      return;
    }
  };

  return {
    loading: state.loading,
    handleLogin,
  };
};

export default useLogin;
