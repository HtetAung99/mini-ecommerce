"use client";
import { CategoryWithChild } from "@/app/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import CollapsibleList from "./collapsible-list";

export default function CategoryFilter({
  categories,
}: {
  categories: CategoryWithChild[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger className="mb-2 flex w-full items-center justify-between">
          <h4 className="text-md font-medium leading-none">Category</h4>
          {open ? <Minus size={"14px"} /> : <Plus size={"14px"} />}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 pl-3">
        {categories
          .filter((c) => c.parentId === null)
          .map((category) => (
            <CollapsibleList
              key={category.id}
              parentUrl={`/p/${category.name}`}
              category={category}
            />
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
