"use client";
import { CategoryWithChild } from "@/app/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function CollapsibleList({
  category,
  parentUrl,
}: {
  category: CategoryWithChild;
  parentUrl: string;
}) {
  const [open, setOpen] = React.useState(false);

  const pathnameArray = usePathname().split("/");
  const categoryInURL = pathnameArray[pathnameArray.length - 1];

  useEffect(() => {
    if (pathnameArray.includes(category.name)) {
      setOpen(true);
    }
  }, []);

  return (
    <Collapsible onOpenChange={setOpen} open={open} key={category.id}>
      <div className="rounded-md px-4 py-2 text-slate-600 text-sm ">
        <CollapsibleTrigger
          className={"flex w-full justify-between items-center mb-2"}>
          <Link
            className={cn(
              "text-md font-medium leading-none",
              category.name === categoryInURL && "text-destructive"
            )}
            href={parentUrl}>
            {category.name}
          </Link>
          {category.children?.length > 0 && (
            <>{open ? <Minus size={"14px"} /> : <Plus size={"14px"} />}</>
          )}
        </CollapsibleTrigger>
      </div>
      {category.children && (
        <CollapsibleContent className="pl-3">
          {category.children.map((c: any) => (
            <CollapsibleList
              key={c.id}
              parentUrl={`${parentUrl}/${c.name}`}
              category={c}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
