import { redirect } from "next/navigation";

export default function Page() {
  return redirect("/admin/users-management/users");
}
