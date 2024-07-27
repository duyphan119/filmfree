import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { title } from "process";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const reqCookie = cookies().get("isSignedIn");
  if (!reqCookie || !reqCookie.value) {
    return redirect("/dang-nhap");
  }
  return (
    <>
      <aside className="w-56 fixed inset-y-0 left-0 bg-slate-600 text-slate-50 flex flex-col">
        <Link
          href="/admin"
          className="flex items-center justify-center text-2xl h-20 px-4 bg-slate-700"
        >
          FILMFREE
        </Link>
        <ScrollArea className="flex-1 p-3">
          <div className="flex flex-col">
            {[
              {
                href: "/admin/phim",
                title: "Phim",
              },
              {
                href: "/admin/country",
                title: "Quốc gia",
              },
              {
                href: "/admin/the-loai",
                title: "Thể loại",
              },
              {
                href: "/admin/dao-dien",
                title: "Đạo diễn",
              },
              {
                href: "/admin/dien-vien",
                title: "Diễn viên",
              },
            ].map(({ href, title }) => (
              <Link
                key={href}
                href={href}
                title={title}
                className="block px-4 py-3 hover:bg-slate-700 rounded-md"
              >
                {title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </aside>
      <div className="fixed left-56 right-0 inset-y-0 flex flex-col bg-slate-800">
        <header className="h-20 bg-slate-600 flex items-center p-4">
          <Button size="icon" variant="outline" className="">
            <Menu />
          </Button>
        </header>
        <ScrollArea className="flex-1 bg-slate-600 ml-px mt-px text-slate-50 rounded-md p-4">
          {children}
        </ScrollArea>
      </div>
    </>
  );
};

export default AdminLayout;
