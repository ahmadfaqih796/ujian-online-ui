import ServiceAdapter from ".";

export async function getSoal(token, params = {}) {
  const { data } = await ServiceAdapter().get(`/soal`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });

  return data;
}
