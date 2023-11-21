import CategoryBreadcrumb from "@/app/(home)/components/category-breadcrumb";
import { getCategoriesFullPath } from "@/app/utils/categories";
import React from "react";

export default async function PLayout({
  params,

  children,
}: {
  params: any;
  searchParams: any;
  children: React.ReactNode;
}) {
  const categoryPathsFromDb = (await getCategoriesFullPath()).map(
    (c) => c.name
  );

  const categoryPaths = params.category.map((c: string) =>
    decodeURIComponent(c)
  );

  const categoryPathString = categoryPaths.join("/");

  if (categoryPathsFromDb.indexOf(categoryPathString) == -1)
    return <h1>Category Not Found!</h1>;

  return (
    <div className="">
      <CategoryBreadcrumb categoryPaths={categoryPaths} />
      <div className="py-5 grid grid-cols-4">{children}</div>
    </div>
  );
}
