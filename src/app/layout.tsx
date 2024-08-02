import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ScrollToTop from "@/components/shared/scroll-to-top";
import "./globals.css";
import { defaultTitlePage } from "@/lib/constants";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: defaultTitlePage,
  description: "Xem phim miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
