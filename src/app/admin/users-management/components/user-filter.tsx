"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Role } from "@prisma/client";
import { useState } from "react";

export default function UserFilter({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { role: rolesSearchParams, status } = searchParams;

  const rolesFromUrl = !rolesSearchParams
    ? []
    : typeof rolesSearchParams === "string"
      ? [rolesSearchParams]
      : rolesSearchParams;

  // const [selectedRoles, setSelectedRoles] = useState<string[] | undefined>(
  //   typeof rolesFromUrl === "string" ? [rolesFromUrl] : rolesFromUrl,
  // );

  const test = (name: string) => {
    console.log("inside test", rolesFromUrl);
    let str = "";
    rolesFromUrl.forEach((r) => {
      if (r != name) {
        str += `role=${r}&`;
      }
    });

    console.log("Str", str);
    return str;
  };

  const roles = [
    Role.ADMIN,
    Role.GENERAL_MANAGER,
    Role.MANAGER,
    Role.STAFF,
    Role.USER,
  ];

  return (
    <div className="flex items-center justify-between">
      <Button className="flex" variant={"default"}>
        <UserPlus size={"18px"} />
        <span className="ml-2">Add User</span>
      </Button>
      <Input className="ml-9 mr-auto w-[20%]" placeholder="Search User ...." />
      <div className="flex w-[50%] flex-row items-center gap-10">
        <span className="min-w-fit pl-2 text-sm font-semibold leading-8 tracking-wider text-slate-400">
          Filter by
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Roles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((role) => (
              <Link
                key={role}
                href={`/admin/users-management?${test(role)}status=${
                  status ?? ""
                }`}
              >
                <DropdownMenuCheckboxItem
                  key={role}
                  checked={rolesFromUrl?.includes(role)}
                  // onCheckedChange={(checked) => {
                  //   if (checked) {
                  //     setSelectedRoles((prev) => [...(prev ?? []), role]);
                  //   } else {
                  //     setSelectedRoles(
                  //       (prev) => prev?.filter((item) => item !== role),
                  //     );
                  //   }
                  // }}
                >
                  {role}
                </DropdownMenuCheckboxItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
