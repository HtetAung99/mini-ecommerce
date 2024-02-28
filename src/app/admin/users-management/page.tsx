import React from "react";
import UserManagement from "./components/user-management";
import RoleManagement from "./components/role-management";
import PermissionManagement from "./components/permission-management";

export default function UserRole({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="my-2 rounded-lg p-2 shadow-sm">
      <UserManagement searchParams={searchParams} />
      <RoleManagement />
      <PermissionManagement />
    </div>
  );
}
// export default function UserRole() {
//   const [email, setEmail] = useState("");
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updated_user = await fetch("http://localhost:3000/api/user/", {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//       }),
//     });
//     console.log(updated_user);

//     if (updated_user.ok) {
//       console.log("User updated");
//     }
//   };
//   return (
//     <>
//       <h1 className="py-7 text-lg font-semibold text-slate-700">
//         Give user to admin access!
//       </h1>
//       <form onSubmit={handleSubmit} className="flex flex-row gap-5 ">
//         <input
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-[30%] rounded-md border-[0.5px] border-solid border-slate-600 pl-5 "
//           type="text"
//           name="email"
//           id="email"
//           placeholder="Email"
//         />
//         <button
//           className="rounded-md bg-[#2663EB] px-4 py-3  text-sm text-white shadow-md"
//           type="submit"
//         >
//           Update User
//         </button>
//       </form>
//     </>
//   );
// }
