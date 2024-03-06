import { getServerSession } from "next-auth";
import NavBar from "./navbar";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { getCurrentUser, isAuthenticted } from "../../../lib/session";
import SearchCommandBox from "./components/search-command-box";
import HeaderBox from "./components/header-box";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";
import { headers } from "next/headers";
import navlinks from "../../../lib/links";

export default async function DashboardLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  const user = await getCurrentUser();

  if (!(await isAuthenticted())) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if (user!.role === Role.USER) {
    redirect("/");
  }

  const h = headers();

  const matchedPath = navlinks.find((navlink) => {
    const pathNameFromHeader = h
      .get("x-pathname")!
      .split("/")
      .slice(2)
      .join("/");
    return pathNameFromHeader.startsWith(navlink.href);
  });

  if (matchedPath && !matchedPath?.access.includes(user!.role)) {
    redirect("/admin");
  }

  return (
    <>
      {auth}
      <section className="h-full">
        <NavBar />
        <div className="ml-56 h-screen overflow-y-auto bg-gray-50 px-10 ">
          <SearchCommandBox />
          <HeaderBox />
          <main className=" rounded-md border border-slate-100 bg-white p-5 shadow-lg">
            {children}
          </main>
        </div>
      </section>
    </>
  );
}
