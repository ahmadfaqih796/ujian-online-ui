import ServiceAdapter from "..";

export async function uploadFile(file = {}) {
  const formData = new FormData();
  formData.append("uri", file);
  const { data: response } = await ServiceAdapter().post("/upload", formData);
  return response;
}
