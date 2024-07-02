type Props = {
  searchParams: {
    keyword?: string;
  };
};

export const generateMetadata = async ({ searchParams }: Props) => {
  const response = await fetch(
    `https://phimapi.com/v1/api/tim-kiem?keyword=${searchParams.keyword}`
  );

  const jsonData = await response.json();

  return {
    title: jsonData.data.seoOnPage.titleHead,
    description: jsonData.data.seoOnPage.descriptionHead,
  };
};

export default async function SearchResults({ searchParams }: Props) {
  const response = await fetch(
    `https://phimapi.com/v1/api/tim-kiem?keyword=${searchParams.keyword}`
  );

  const jsonData = await response.json();
  return <>SearchResults</>;
}
