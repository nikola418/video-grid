import axios from "axios";

export type VideoInfo = {
  title: string;
  thumbnail: string;
  desc: string;
  url: string;
  createdAt: number;
  updatedAt: number;
};

export const getAll = async ({
  page,
  limit,
  search,
  category,
}: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<VideoInfo[]> => {
  const { data } = await axios.get<VideoInfo[]>(
    `${import.meta.env.VITE_API_URL}/video-infos`,
    { params: { _page: page, _limit: limit, title: search, category } }
  );

  return data;
};
