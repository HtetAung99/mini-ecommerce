"use client";
import { Role, User } from "@prisma/client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { editRole } from "@/app/actions/role";

export default function RoleEdit({ user }: { user: any }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleEdit = async (userId: string, role: Role) => {
    try {
      await editRole(userId, role);
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <PopoverTrigger
        className={cn(
          "px-4 py-2 ",
          isOpen && "rounded-md border border-slate-300",
        )}
      >
        <span className={cn("font-bold capitalize text-slate-500")}>
          {user.role.toLowerCase()}
        </span>
      </PopoverTrigger>
      <PopoverContent className=" flex max-w-fit flex-col gap-1">
        {roles.map((role) => (
          <div
            onClick={() => handleEdit(user.id, role)}
            className="flex w-full cursor-pointer flex-row items-center gap-3 rounded-sm px-2 py-2 text-sm capitalize leading-8 tracking-wider hover:bg-slate-200 hover:font-semibold"
          >
            {role.toLowerCase()}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

const roles = [
  Role.SUPERADMIN,
  Role.ADMIN,
  Role.STOREMANAGER,
  Role.STAFF,
  Role.USER,
];
