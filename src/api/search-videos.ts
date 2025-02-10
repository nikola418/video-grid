import axios from "axios";
import { PaginationParams, Videos } from "pexels";

type Params = {
  query?: string;
} & PaginationParams;

export const getAll = async (params: Params): Promise<Videos> => {
  const { data } = await axios.get<Videos>(
    `${import.meta.env.VITE_PEXELS_API_URL}/videos/search`,
    {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
      params,
    }
  );

  return data;
};
