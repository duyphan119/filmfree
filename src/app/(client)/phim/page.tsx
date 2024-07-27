import Information from "@/components/shared/information";
import { MessageSquareWarning } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
};

const keyName: Record<string, string> = {
  director: "Đạo diễn",
  actor: "Diễn viên",
  country: "Quốc gia",
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
    const jsonData = await response.json();

    return {
      title: `FILMFREE | ${jsonData.movie.name}`,
      description: jsonData.movie.content,
    };
  } catch (error) {
    return {
      title: `FILMFREE | Xem phim miễn phí`,
    };
  }
};

export default async function Details({ params, searchParams }: Props) {
  try {
    const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
    const jsonData = await response.json();

    return (
      <>
        <Information item={jsonData} hasLinks={true} />
        <div className="space-y-4 p-4">
          <div className="">{jsonData.movie.content}</div>
          {jsonData.movie.trailer_url && (
            <div className="">
              <iframe
                width="560"
                height="315"
                src={jsonData.movie.trailer_url.replace("/watch?v=", "/embed/")}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                className="mx-auto"
              ></iframe>
            </div>
          )}
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="bg-destructive text-destructive-foreground p-4 flex gap-1">
        <MessageSquareWarning />
        <span>Có lỗi xảy ra, vui lòng thử lại sau!</span>
      </div>
    );
  }
}
