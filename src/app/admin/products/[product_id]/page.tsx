import { getProductById } from "@/app/utils/products";
import React from "react";
import prisma from "../../../../../lib/prisma";
import { attributesValuesByProductId } from "@/app/utils/variants";
import PrductDetailCardAdmin from "./components/product-detail-card-admin";

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

  // const availableProducts =
  //   (await prisma.productAvailability.findMany({
  //     include: { store: true },
  //     where: { productId: Number(params.product_id) },
  //   })) || [];

  // const filteredStores = stores.filter((s) => {
  //   return !availableProducts.map((pa) => pa.storeId).includes(s.id);
  // });

  // console.log(filteredStores);

  const attributeValues = await attributesValuesByProductId(product.id);

  return (
    <>
      {/* <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>

        {Object.entries(attributeValues).map(([key, value]: [string, any]) => {
          console.log(value.size);
          return (
            <div key={key}>
              <h3 key={key}>{key}</h3>
              <ul>
                {[...value].map((v: any) => {
                  const val = JSON.parse(v);
                  console.log("here", val);
                  return <li key={val.id}>{val.name}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div></div> */}

      <PrductDetailCardAdmin
        attributeValues={attributeValues}
        product={product}
      />
    </>
  );
}
