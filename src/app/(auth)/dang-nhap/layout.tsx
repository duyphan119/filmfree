import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AdminLoginLayoutProps = {
  children: React.ReactNode;
};

const AdminLoginLayout = ({ children }: AdminLoginLayoutProps) => {
  const reqCookie = cookies().get("isSignedIn");
  if (reqCookie && reqCookie.value) {
    return redirect("/admin");
  }

  return (
    <>
      <div className="bg-slate-800 h-screen flex items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default AdminLoginLayout;
