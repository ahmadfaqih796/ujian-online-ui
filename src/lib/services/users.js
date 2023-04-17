import ServiceAdapter from ".";

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
