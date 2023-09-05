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
