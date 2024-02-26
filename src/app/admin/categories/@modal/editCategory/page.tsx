import { Modal } from "@/app/components/modal";
import React from "react";
import CategoryEditForm from "./cat-edit-form";
import { useParams } from "next/navigation";
import { getCategoryById } from "@/app/utils/categories";

export default async function editModal({
  searchParams,
}: {
  searchParams: any;
}) {
  const category = await getCategoryById(Number(searchParams.catId));
  return (
    <Modal>
      <CategoryEditForm category={category} />
    </Modal>
  );
}
