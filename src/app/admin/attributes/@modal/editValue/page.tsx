import React from "react";
import ValueEditForm from "./attr-value-edit-form";
import { Modal } from "@/app/components/modal";
import {
  getAttributeById,
  getAttributesValueById,
} from "@/app/utils/attributes";

export default async function ValueEditPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const attribute = await getAttributeById(Number(searchParams.attrId));
  const attributeValue = await getAttributesValueById(
    Number(searchParams.attrValId),
  );
  return (
    <Modal>
      <ValueEditForm
        valueSet={attribute!.name.toLowerCase() === "color"}
        attributeValue={attributeValue!}
      />
    </Modal>
  );
}
