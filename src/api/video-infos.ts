import axios from "axios";

export type VideoInfo = {
  title: string;
  thumbnail: string;
  desc: string;
  url: string;
  createdAt: number;
  updatedAt: number;
};

type PaginatedResponse<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};

export const getAll = async ({
  page,
  perPage,
  search,
  category,
}: {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
}): Promise<PaginatedResponse<VideoInfo>> => {
  const { data } = await axios.get<PaginatedResponse<VideoInfo>>(
    `${import.meta.env.VITE_API_URL}/video-infos`,
    { params: { _page: page, _per_page: perPage, title: search, category } }
  );

  return data;
};
