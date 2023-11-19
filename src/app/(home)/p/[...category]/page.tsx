import { getCategoryByName } from "@/app/utils/categories";
import React from "react";
import FilterBar from "./components/filter-bar";
import { redirect } from "next/navigation";
import {
  getProductByCategoryId,
  getProductByFilters,
} from "@/app/utils/products";
import ProductList from "./components/product-list";
import { ProductWithNestedData } from "@/app/types";

export default async function P({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categoryName = decodeURIComponent(
    params.category[params.category.length - 1]
  );
  const category = await getCategoryByName(categoryName);

  if (!category) {
    return redirect("/");
  }
  // const products: ProductWithNestedData[] = await getProductByCategoryId(
  //   category.id
  // );

  const filteredProducts = await getProductByFilters({
    ...searchParams,
    categoryId: category.id,
  });

  // const filterProducts = () => {
  //   if (searchParams["price"]) {
  //     const price = searchParams["price"] as string;
  //     const [min, max] = price.split("-").map((p) => parseInt(p));
  //     return products.filter(
  //       (p) => p.variants[0].price >= min && p.variants[0].price <= max
  //     );
  //   }
  //   return products;
  // };

  return (
    <>
      <FilterBar />
      <ProductList products={filteredProducts} />
    </>
  );
}
