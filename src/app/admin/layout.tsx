import { getServerSession } from "next-auth";
import NavBar from "./navbar";
import { authOption } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { getCurrentUser, isAuthenticted } from "../../../lib/session";

export default async function DashboardLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session: any = await getServerSession(authOption);

  if (!(await isAuthenticted())) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if ((await getCurrentUser())?.role === Role.USER) {
    redirect("/");
  }

  return (
    <>
      {auth}
      <section className="h-full bg-gray-200">
        <NavBar />
        <div className="ml-56 h-screen overflow-y-auto px-14 py-10">
          {children}
        </div>
      </section>
    </>
  );
}
