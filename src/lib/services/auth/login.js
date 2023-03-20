import ServiceAdapter from ".";

export async function loginService(data, options = {}) {
  const { data: response } = await ServiceAdapter().post(
    "/authentication",
    data
  );
  return response;
}
