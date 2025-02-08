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
  start,
  stop,
  search,
  category,
}: {
  start?: number;
  stop?: number;
  search?: string;
  category?: string;
}): Promise<VideoInfo[]> => {
  const { data } = await axios.get<VideoInfo[]>(
    `${import.meta.env.VITE_API_URL}/video-infos`,
    { params: { _start: start, _end: stop, title: search, category } }
  );

  return data;
};
