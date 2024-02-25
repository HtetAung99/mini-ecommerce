import { getServerSession } from "next-auth";
import NavBar from "./navbar";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { getCurrentUser, isAuthenticted } from "../../../lib/session";
import SearchCommandBox from "./components/search-command-box";
import HeaderBox from "./components/header-box";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";

export default async function DashboardLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  if (!(await isAuthenticted())) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if ((await getCurrentUser())?.role === Role.USER) {
    redirect("/");
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
