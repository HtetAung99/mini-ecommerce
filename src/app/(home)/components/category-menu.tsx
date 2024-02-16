"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryWithChild } from "../../types";
import clsx from "clsx";
import CategoryChildrenList from "./category-children-list";
import Cookies from "js-cookie";

export default function CatMenuList({
  categories,
}: {
  categories: CategoryWithChild[];
}) {
  const parentCategories = categories.filter(
    (cat: CategoryWithChild) => cat.parentId === null,
  );

  const [selectedParent, setSelectedParent] = useState({
    name: parentCategories[0].name,
    id: parentCategories[0].id,
  });
  const defaultStore = JSON.parse(Cookies.get("defaultStore")!);
  return (
    <div className="grid h-[400px] grid-cols-3 gap-2">
      <ScrollArea className=" col-span-1 mr-4  flex flex-col border-r border-slate-200 pr-2">
        {parentCategories.map((category: CategoryWithChild) => (
          <Button
            key={category.id}
            onMouseOver={() =>
              setSelectedParent({ name: category.name, id: category.id })
            }
            className={clsx(
              selectedParent.id === category.id && "bg-slate-300",
            )}
            variant={"ghost"}
            asChild
          >
            <Link
              target="_blank"
              className="flex w-full justify-between"
              href={`/p/${category.name}?storeId=${defaultStore?.id}`}
            >
              {category.name}
              <span className="text-xl">&gt;</span>
            </Link>
          </Button>
        ))}
      </ScrollArea>
      <CategoryChildrenList
        categories={categories}
        selectedParent={selectedParent}
      />
    </div>
  );
}
