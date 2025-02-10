import axios from "axios";
import { PaginationParams, Videos } from "pexels";

export const getAll = async (params: PaginationParams): Promise<Videos> => {
  const { data } = await axios.get<Videos>(
    `${import.meta.env.VITE_PEXELS_API_URL}/videos/popular`,
    {
      headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
      params,
    }
  );

  return data;
};
