import axios from "axios";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("https://phimapi.com/the-loai");

  return data;
};
