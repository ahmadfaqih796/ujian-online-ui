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

export const deleteMultipleSoal = async (token, params = {}) => {
  const { data: response } = await ServiceAdapter().delete(`/soal`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });
  return response;
};
