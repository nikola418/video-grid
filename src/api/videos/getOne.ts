import axios from "axios";
import type { Video } from "pexels";

export const getOne = async (videoId: string): Promise<Video> => {
  const { data } = await axios.get<Video>(
    `${import.meta.env.VITE_PEXELS_API_URL}/videos/${videoId}`,
    { headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } },
  );

  return data;
};
