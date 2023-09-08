import ServiceAdapter from ".";

export const getAllUser = async (token, params = {}) => {
  const { data } = await ServiceAdapter().get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });

  return data;
};

export const getOneUser = async (id, token) => {
  const { data } = await ServiceAdapter().get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addUser = async (data) => {
  const { data: response } = await ServiceAdapter().post("/users", data);
  return response;
};

export const deleteUser = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
