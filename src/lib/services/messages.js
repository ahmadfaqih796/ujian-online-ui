import ServiceAdapter from ".";

export const getMessages = async (token, params = {}) => {
  const { data } = await ServiceAdapter().get(`/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });

  return data;
};

export const addMessages = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/messages", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateMessages = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/messages/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};