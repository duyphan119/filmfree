import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Header from "@/components/shared/header";
import QueryWrapper from "@/components/shared/query-wrapper";
import ScrollToTop from "@/components/shared/scroll-to-top";
import Footer from "@/components/shared/footer";
import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FILMFREE | Xem phim miễn phí",
  description: "FILMFREE | Xem phim miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryWrapper>
          <Header />
          <ScrollToTop />
          <div className="bg-slate-800">
            <div className="max-w-5xl mx-auto lg:px-10 md:px-8 sm:px-6 px-4 py-3">
              <div className="bg-black rounded-md text-muted min-h-[calc(100vh-11.5rem)]">
                {children}
              </div>
            </div>
          </div>
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}
