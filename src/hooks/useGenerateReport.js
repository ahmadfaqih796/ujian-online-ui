import ServiceAdapter from "@/lib/services";
import * as FileDownload from "js-file-download";
import React from "react";
const useGenerateReport = () => {
  const [loading, setLoading] = React.useState(false);
  const generate = async ({ data, config, onSuccess, onError }) => {
    setLoading(true);
    try {
      const response = await ServiceAdapter().post(
        "/export/users",
        data,
        config
      );
      FileDownload(response.data, `guru.xlsx`);
      setLoading(false);
      onSuccess();
      return;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      const errMessage =
        error.response?.data?.message ?? "Maaf terjadi kesalahan pada server";
      onError(errMessage);
      onError(errMessage);
      return;
    }
  };
  return { generate, loading };
};

export default useGenerateReport;
