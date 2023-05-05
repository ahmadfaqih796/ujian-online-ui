import ServiceAdapter from ".";

export const addLesson = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/pelajaran", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteLesson = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/pelajaran/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
