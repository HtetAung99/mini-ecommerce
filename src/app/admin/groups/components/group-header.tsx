import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GroupHeader() {
  return (
    <div className="flex items-center justify-between">
      <Button asChild className="flex" variant={"default"}>
        <Link href="/admin/groups/addGroup">
          <Users size={"18px"} />
          <span className="ml-2">Add New Group</span>
        </Link>
      </Button>
      <Input className="ml-9 mr-auto w-[25%]" placeholder="Search Group ...." />
      <div className="flex w-[10%] flex-row items-center gap-10">
        {/* <span className="min-w-fit pl-2 text-sm font-semibold leading-8 tracking-wider text-slate-400">
          Filter by
        </span> */}
        <Select>
          <SelectTrigger className="rounded-none border-0 focus:ring-0">
            <SelectValue placeholder="Filter By" />
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
