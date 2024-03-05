import { Modal } from "@/app/components/modal";
import React from "react";
import ProductEditForm from "./components/product-edit-form";
import { getCategoriesFullPath } from "@/app/utils/categories";
import { getProductById } from "@/app/utils/products";

export default async function productBaseEdit({
  params,
}: {
  params: { product_id: number };
}) {
  const categories = await getCategoriesFullPath();
  const product = await getProductById(Number(params.product_id));
  return (
    <Modal>
      <ProductEditForm categories={categories} product={product!} />
    </Modal>
  );
}
