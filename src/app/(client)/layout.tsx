import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <Header />
      <div className="bg-slate-800">
        <div className="max-w-5xl mx-auto lg:px-10 md:px-8 sm:px-6 px-4 py-3">
          <div className="bg-black rounded-md text-muted md:min-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-7.5rem)]">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientLayout;