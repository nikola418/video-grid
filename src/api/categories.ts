import axios from "axios";

export type Category = {
  id: number;
  slug: string;
  name: string;
};

export const getAll = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  return data;
};
