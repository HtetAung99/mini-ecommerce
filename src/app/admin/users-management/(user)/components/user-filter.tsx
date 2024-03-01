"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Role } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export default function UserFilter({}: {}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const arrayQueries: string[] = ["role"];

  const createSearchQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchParams.has(name) && arrayQueries.includes(name)) {
        const searchParamsValue = searchParams.getAll(name);
        if (searchParamsValue.includes(value)) {
          params.delete(name, value);
        } else {
          params.append(name, value);
        }
        return params.toString();
      }
      if (searchParams.has(name) && searchParams.get(name) === value) {
        params.delete(name);
        return params.toString();
      }

      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

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
      <div className="flex flex-row items-center gap-10">
        <span className="min-w-fit pl-2 text-sm font-semibold leading-8 tracking-wider text-slate-400">
          Filter by
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger
            className=" focus:bg-none focus:outline-none focus:ring-0"
            asChild
          >
            <Button className="no-underline" variant="link">
              Roles
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Roles</DropdownMenuLabel>
            {roles.map((role) => (
              <Link
                className="capitalize"
                key={role}
                href={`${pathName}?${createSearchQuery("role", role)}`}
              >
                <DropdownMenuCheckboxItem
                  key={role}
                  checked={searchParams.getAll("role")?.includes(role)}
                >
                  {role.toLowerCase()}
                </DropdownMenuCheckboxItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>

            <DropdownMenuRadioGroup value={searchParams.get("status")!}>
              <Link
                href={`${pathName}?${createSearchQuery("status", "active")}`}
              >
                <DropdownMenuRadioItem value={"active"}>
                  Active
                </DropdownMenuRadioItem>
              </Link>
              <Link
                href={`${pathName}?${createSearchQuery("status", "inactive")}`}
              >
                <DropdownMenuRadioItem value={"inactive"}>
                  Inactive
                </DropdownMenuRadioItem>
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          className={cn(
            "text-sm font-medium leading-8 tracking-wide text-red-600",
            searchParams.toString() === ""
              ? "pointer-events-none text-red-300"
              : "",
          )}
          href={`${pathName}`}
        >
          Clear all filters
        </Link>
      </div>
    </div>
  );
}
