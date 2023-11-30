import { getCategoryByName } from "@/app/utils/categories";
import React from "react";
import FilterBar from "./components/filter-bar";
import { redirect } from "next/navigation";
import { getProductByFilters } from "@/app/utils/products";
import ProductList from "./components/product-list";

export default async function P({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categoryName = decodeURIComponent(
    params.category[params.category.length - 1],
  );
  const category = await getCategoryByName(categoryName);

  if (!category) {
    return redirect("/");
  }

  const [filteredProducts, count] = await getProductByFilters({
    ...searchParams,
    categoryId: category.id,
  });
  console.log(count);

  return (
    <>
      <FilterBar params={params} />
      <ProductList count={count} products={filteredProducts} />
    </>
  );
}
