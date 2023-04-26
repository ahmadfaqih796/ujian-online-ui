import { clone } from "ramda";
import ServiceAdapter from "..";

const paginationUser = async (url, context, headers = {}) => {
  const newQuery = clone(context);
  const perPage = newQuery?.per_page ?? 6;
  const page = newQuery?.page ?? 1;

  newQuery.$skip = page * perPage - perPage;
  delete newQuery.page;
  newQuery.$limit = perPage;
  delete newQuery.per_page;
  const data = await ServiceAdapter().get(url, {
    params: newQuery,
    headers: headers,
  });
  return data.data;
};

export default paginationUser;
