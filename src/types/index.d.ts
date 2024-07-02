declare type Modified = {
  time: string;
};

declare type Category = {
  id: string;
  name: string;
  slug: string;
};

declare type Country = {
  id: string;
  name: string;
  slug: string;
};

declare type Movie = {
  modified: Modified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Country[];
};
