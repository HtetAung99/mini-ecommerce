"use client";

import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { CategoryWithChild } from "../../types";
import Link from "next/link";

export default function CategoryChildrenList({
  categories,
  selectedParent,
}: {
  categories: CategoryWithChild[];
  selectedParent: { name: string; id: Number };
}) {
  const filteredCategories = categories.filter(
    (cat) => cat.parentId === selectedParent.id,
  );
  const defaultStore = JSON.parse(
    localStorage.getItem("selectedStore") || "null",
  );

  return (
    <div className="col-span-2 flex flex-col flex-wrap gap-2 overflow-auto">
      {filteredCategories.map((category: CategoryWithChild) => (
        <div key={category.id} className="flex w-1/2 flex-shrink flex-col">
          <h6 className=" py-3 text-base  font-semibold">
            <Link
              href={`/p/${selectedParent.name}/${category.name}?storeId=${defaultStore?.id}`}
              target="_blank"
            >
              {category.name}
            </Link>
          </h6>

          <ul className="pb-3">
            {category.children.map((child: Category) => (
              <li
                key={child.id}
                className="font text-sm font-normal text-slate-600"
              >
                <Link
                  href={`/p/${selectedParent.name}/${category.name}/${child.name}?storeId=${defaultStore?.id}`}
                  target="_blank"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
          <Separator />
        </div>
      ))}
    </div>
  );
}
