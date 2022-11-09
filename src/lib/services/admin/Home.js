import ServiceAdapter from "..";

export async function getHome(token) {
  const res = await ServiceAdapter().get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
