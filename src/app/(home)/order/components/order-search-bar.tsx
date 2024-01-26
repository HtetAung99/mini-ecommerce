import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function OrderSearch() {
  return (
    <div className="my-4 flex w-full flex-row justify-between pb-4">
      <div className="flex basis-2/3 justify-start">
        <input
          className="h-10 w-[80%] rounded-md rounded-r-none border border-r-0 border-slate-200 p-2 px-4 focus:outline-none"
          type="text"
          name="searchOrder"
          id="searchOrder"
        />
        <Button className="rounded-l-none">Search</Button>
      </div>
      <div className=" flex basis-1/3 items-center justify-end gap-4">
        <span>Filter: </span>
        <Select>
          <SelectTrigger className="w-[60%]">
            <SelectValue placeholder="Past 3 Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
