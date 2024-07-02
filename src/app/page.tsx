import HomePage from "@/components/shared/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `FILMFREE | Xem phim miễn phí`,
};

export default function Home() {
  return <HomePage />;
}
