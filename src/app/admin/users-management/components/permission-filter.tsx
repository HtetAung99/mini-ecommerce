import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownNarrowWide } from "lucide-react";
import React from "react";

export default function PermissionFilter() {
  return (
    <div className="flex items-center justify-between">
      <Button className="flex" variant={"default"}>
        <span className="">Add New Permission</span>
      </Button>

      <div className="flex flex-row items-center gap-10">
        <Select>
          <SelectTrigger className="min-w-[8vw] rounded-none border-0 focus:ring-0">
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
