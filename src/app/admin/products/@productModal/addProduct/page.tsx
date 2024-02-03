import { getCategoriesFullPath } from "@/app/utils/categories";
import ModalForm from "./components/form";
import { Modal } from "../../../../components/modal";
import { getAttributes } from "@/app/utils/attributes";

export default async function ProductModal() {
  const categories = await getCategoriesFullPath();
  const attributes = await getAttributes();

  return (
    <Modal>
      <ModalForm categories={categories} attributes={attributes} />
    </Modal>
  );
}
