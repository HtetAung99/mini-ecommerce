import React from "react";
import ProductCard from "../p/[...category]/components/product-card";

import {
  getBestSellers,
  getNewArrivals,
  getProductsWithPromotions,
} from "@/app/utils/products";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { storeId }: { storeId: string } = searchParams;
  const cookieStore = cookies();

  const defaultStore = JSON.parse(
    cookieStore.get("defaultStore")?.value || "null",
  );
  if (!defaultStore) {
    return redirect("/");
  }

  if (!storeId || Number(storeId) !== defaultStore.id) {
    return redirect(`/products?storeId=${defaultStore.id}`);
  }

  const bestSellers = await getBestSellers(storeId);
  const newArrivals = await getNewArrivals(storeId);
  const promotionProducts = await getProductsWithPromotions(storeId);

  return (
    <div className="mx-[10vw] block overflow-hidden py-2">
      {/* <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} flex={true} product={product} />
        ))}
      </div> */}
      <div className="self-start">
        <h3 className="my-3">Best Sellers</h3>
        <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row ">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} flex={true} product={product} />
          ))}
        </div>
      </div>
      <div className="self-start">
        <h3 className="my-3">Promotions</h3>
        <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row ">
          {promotionProducts.map((promotionProduct) => (
            <ProductCard
              key={promotionProduct.id}
              flex={true}
              product={promotionProduct}
              promotionId={promotionProduct.promotion}
            />
          ))}
        </div>
      </div>
      <div className="self-start ">
        <h3 className="my-3">New Arrivals</h3>
        <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row ">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} flex={true} product={product} />
          ))}
        </div>
      </div>
      <div className="self-start">
        <h3>Just For You</h3>
      </div>
    </div>
  );
}
