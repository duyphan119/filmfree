import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Category, getCategories } from "@/lib/category";
import { Country, getCountries } from "@/lib/country";
import axios from "axios";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = async ({ children }: ClientLayoutProps) => {
  let categories: Category[] = [];
  let countries: Country[] = [];

  try {
    categories = await getCategories();
    countries = await getCountries();
  } catch (error) {}
  return (
    <>
      <Header categories={categories} countries={countries} />
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
