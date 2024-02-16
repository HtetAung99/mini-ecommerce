import { getCategoryByName } from "@/app/utils/categories";
import React from "react";
import FilterBar from "./components/filter-bar";
import { redirect } from "next/navigation";
import { getProductByFilters } from "@/app/utils/products";
import ProductList from "./components/product-list";
import { cookies } from "next/headers";

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
  const { storeId } = searchParams;
  const cookieStore = cookies();

  const defaultStore = JSON.parse(
    cookieStore.get("defaultStore")?.value || "null",
  );
  if (!defaultStore) {
    return redirect("/");
  }

  if (!storeId || Number(storeId) !== defaultStore.id) {
    return redirect(
      `/p/${params.category.join("/")}?storeId=${defaultStore.id}`,
    );
  }
  return (
    <>
      <FilterBar params={params} searchParams={searchParams} />
      <ProductList count={count} products={filteredProducts} />
    </>
  );
}
