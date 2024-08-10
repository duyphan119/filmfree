import HomePage from "@/components/shared/home-page";

import { defaultTitlePage } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultTitlePage,
};

export default async function Home() {
  return <HomePage />;
}
