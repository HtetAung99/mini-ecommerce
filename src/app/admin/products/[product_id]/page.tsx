import { getProductById } from "@/app/utils/products";
import React from "react";
import prisma from "../../../../../lib/prisma";
import StoreList from "./store-list";
import StoreDropDown from "./store-dropdown";
import { attributesValuesByProductId } from "@/app/utils/variants";

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
  console.log(attributeValues);

  return (
    <>
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        {Object.entries(attributeValues).map(([key, value]: [string, any]) => {
          return (
            <>
              <h3 key={key}>{key}</h3>
              <ul>
                {value.map((v: any) => (
                  <li key={v.id}>{v.name}</li>
                ))}
              </ul>
            </>
          );
        })}
        {/* <span>{product.price}</span> */}
      </div>
      {/* <StoreDropDown productId={product.id} filteredStores={filteredStores} /> */}
      <div>
        {/* {availableProducts.map((pa) => {
          return <StoreList productData={pa} />;
        })} */}
      </div>
    </>
  );
}
