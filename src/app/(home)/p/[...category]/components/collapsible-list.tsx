"use client";
import { CategoryWithChild } from "@/app/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CollapsibleList({
  category,
  parentUrl,
}: {
  category: CategoryWithChild;
  parentUrl: string;
}) {
  const [open, setOpen] = useState(false);

  const pathnameArray = usePathname()!.split("/").slice(2).map(decodeURI);
  const categoryInURL = pathnameArray[pathnameArray.length - 1];
  const cookieValue = Cookies.get("defaultStore");
  const defaultStore = cookieValue ? JSON.parse(cookieValue!) : null;

  useEffect(() => {
    if (pathnameArray.includes(category.name)) {
      setOpen(true);
    }
  }, []);

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <div className="rounded-md px-4 py-2 text-sm text-slate-600 ">
        <CollapsibleTrigger
          className={"mb-2 flex w-full items-center justify-between"}
        >
          <Link
            className={cn(
              "text-md font-medium leading-none",
              category.name === decodeURI(categoryInURL) && "text-destructive",
            )}
            href={parentUrl + "?storeId=" + defaultStore?.id}
          >
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
