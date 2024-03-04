import { getProductById } from "@/app/utils/products";
import React from "react";
import prisma from "../../../../../lib/prisma";
import { attributesValuesByProductId } from "@/app/utils/variants";
import ProductDetailCardAdmin from "./components/product-detail-card-admin";

export default async function ProductDetail({
  params,
}: {
  params: { product_id: number };
}) {
  const product = await getProductById(Number(params.product_id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const stores = await prisma.store.findMany();

  const attributeValues = await attributesValuesByProductId(product.id);

  return (
    <>
      <ProductDetailCardAdmin
        attributeValues={attributeValues}
        product={product}
      />
    </>
  );
}
