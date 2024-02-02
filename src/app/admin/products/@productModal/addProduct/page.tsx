import { getCategoriesFullPath } from "@/app/utils/categories";
import ModalForm from "./form";
import { Modal } from "../../../../components/modal";

export default async function ProductModal() {
  const categories = await getCategoriesFullPath();

  return (
    <Modal>
      <ModalForm categories={categories} />
    </Modal>
  );
}
