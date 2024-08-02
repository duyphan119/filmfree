import axios from "axios";

export type Country = {
  id: string;
  name: string;
  slug: string;
};

export const getCountries = async (): Promise<Country[]> => {
  const { data } = await axios.get("https://phimapi.com/quoc-gia");

  return data;
};
