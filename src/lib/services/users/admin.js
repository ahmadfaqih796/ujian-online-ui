import ServiceAdapter from "..";

export const getOneAdmin = async (id, token) => {
  const { data } = await ServiceAdapter().get(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addAdmin = async (data) => {
  const { data: response } = await ServiceAdapter().post("/admin", data);
  return response;
};

export const deleteAdmin = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
