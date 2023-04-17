import ServiceAdapter from ".";

export async function getOneUser(id, token) {
  const { data } = await ServiceAdapter().get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
