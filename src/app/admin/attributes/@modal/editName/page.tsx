import { Modal } from "@/app/components/modal";
import React from "react";
import NameEditForm from "./attr-name-edit-form";
import { getAttributeById } from "@/app/utils/attributes";

export default async function NameEditPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const attribute = await getAttributeById(Number(searchParams.attrId));
  return (
    <Modal>
      <NameEditForm attribute={attribute!} />
    </Modal>
  );
}
