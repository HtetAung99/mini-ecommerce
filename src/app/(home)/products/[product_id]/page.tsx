import { getProductById } from "@/app/utils/products";
import React, { ReactNode } from "react";
import CategoryHeader from "./components/category-header";
import ProductInfo from "./components/product-info";
import Image from "next/image";
import { ProductWithNestedData } from "@/app/types";

export default async function ProductDetailPage({
  params,
}: {
  params: { product_id: Number };
}) {
  const product: ProductWithNestedData | null = await getProductById(
    Number(params.product_id),
  );
  if (!product) {
    return <p>Not found</p>;
  }

  return (
    <div className="">
      <CategoryHeader product_id={product.id} />
      <div className="flex w-full flex-row gap-10  py-5">
        <div className="w-[50%] self-start rounded-md border-2 border-slate-200">
          <Image
            height={400}
            width={400}
            className="m-auto rounded-md object-cover"
            src={"/images/Dummy.jpeg"}
            alt={""}
          />
        </div>

        <ProductInfo product={product} />
      </div>
    </div>
  );
}
