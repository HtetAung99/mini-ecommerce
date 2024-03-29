import { Button } from "@/components/ui/button";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function RoleFilter() {
  return (
    <div className="flex items-center justify-between">
      <Button asChild className="flex" variant={"default"}>
        <Link href="/admin/users-management/addRole" className="">
          Add New Role
        </Link>
      </Button>

      <div className="flex min-w-[15vw] flex-row items-center gap-10">
        <span className="min-w-fit pl-2 text-sm font-semibold leading-8 tracking-wider text-slate-400">
          Filter by
        </span>
        <Select>
          <SelectTrigger className="rounded-none border-0 focus:ring-0">
            <SelectValue className="" placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
