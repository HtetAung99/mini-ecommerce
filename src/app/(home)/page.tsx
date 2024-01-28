import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import {
  getBestSellers,
  getNewArrivals,
  getPromotions,
} from "../utils/products";
import ProductCard from "./p/[...category]/components/product-card";
import { Product } from "@prisma/client";

export default async function Home({}) {
  const session = await getServerSession(authOption);
  const bestSellers = await getBestSellers();
  const newArrivals = await getNewArrivals();
  const promotionProducts = await getPromotions();

  return (
    <div className="m-auto flex flex-col items-center justify-between gap-4 overflow-hidden py-2">
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
          {promotionProducts.slice(0, 10).map((promotionProduct) => (
            <ProductCard
              key={promotionProduct.id}
              flex={true}
              product={promotionProduct}
              promotionId={promotionProduct.promotion.id}
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
