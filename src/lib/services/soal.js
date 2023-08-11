import ServiceAdapter from ".";

export const getSoal = async (token, params = {}) => {
  const { data } = await ServiceAdapter().get(`/soal`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });

  return data;
};

export const addSoal = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/soal", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteMultipleSoal = async (token, id) => {
  const { data: response } = await ServiceAdapter().delete(`/soal`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id_soal: id,
    },
  });
  return response;
};
