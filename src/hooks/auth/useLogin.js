import { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const useLogin = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
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
      setColor("success");
      setMessage("Berhasil login");
      setOpen(true);
      handleLoading(false);
      console.log("anda berhasil login", res);
      router.replace("/admin/home");
    } catch (error) {
      handleLoading(false);
      setColor("error");
      setMessage(
        error?.response?.data.message ?? "Terjadi kesalahan pada server"
      );
      setOpen(true);
      return;
    }
  };

  return {
    loading: state.loading,
    handleLogin,
    color,
    message,
    open,
    setOpen,
  };
};

export default useLogin;
