import { getAll as searchAll } from "@/api/search-videos";
import { getAll as popularAll } from "@/api/popular-videos";

export const perColumn = 4;
export const aspectRatio = 16 / 9;

export const calculateColumnCount = (width: number) =>
  width < 768 ? 1 : width < 1024 ? 2 : width < 1480 ? 3 : 4;

export const searchVideos = async (
  page: number,
  perPage: number,
  search?: string,
  category?: string
) => {
  let query = "";
  query = query.concat(category ?? "", search ? `,${search}` : "");

  const result = await searchAll({
    query,
    page,
    per_page: perPage,
  });

  return result;
};

export const getPopular = async (page: number, perPage: number) => {
  const result = await popularAll({
    page,
    per_page: perPage,
  });

  return result;
};
