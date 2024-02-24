import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { getCurrentUser } from "../../../../lib/session";
import Link from "next/link";

export default async function SearchCommandBox() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className=" my-2 flex items-center justify-between py-2">
      <div className="relative w-1/3">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for stocks or orders ...."
          className="w-full pl-8"
        />
      </div>

      <div className="flex flex-row items-center gap-7 border-l border-slate-200 pl-5">
        <Avatar className="h-full">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link href="/api/auth/signout" className="text-slate-500">
          <h3 className="text-sm  font-light leading-7 tracking-wide">
            {user.name}
          </h3>
          <span className="text-xs font-semibold capitalize leading-6 tracking-normal">
            {user.role.toLowerCase()}
          </span>
        </Link>
      </div>
    </div>
  );
}
