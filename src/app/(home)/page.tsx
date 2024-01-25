import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import {
  getBestSellers,
  getNewArrivals,
  getPromotions,
} from "../utils/products";
import ProductCard from "./p/[...category]/components/product-card";

export default async function Home({}) {
  const session = await getServerSession(authOption);
  const bestSellers = await getBestSellers();
  const newArrivals = await getNewArrivals();
  const products = await getPromotions();

  return (
    <div className="m-auto flex max-h-fit flex-col items-center justify-between gap-4  py-2">
      {/* <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} flex={true} product={product} />
        ))}
      </div> */}
      <div className="self-start ">
        <h3 className="my-3">Best Sellers</h3>
        <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row ">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} flex={true} product={product} />
          ))}
        </div>
      </div>
      <div className="self-start">
        <h3>Promotions</h3>
        <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row ">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              flex={true}
              product={product}
              promotionId={product.promotion.id}
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
