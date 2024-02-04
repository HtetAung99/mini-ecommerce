import { Modal } from "@/app/components/modal";

import React from "react";
import AddVaraintForm from "./components/add-variant-form";
import { getAttributes } from "@/app/utils/attributes";

export default async function AddVariantPage({
  params,
}: {
  params: { product_id: number };
}) {
  const attributes = await getAttributes();
  return (
    <Modal>
      <AddVaraintForm attributes={attributes} productId={params.product_id} />
    </Modal>
  );
}
