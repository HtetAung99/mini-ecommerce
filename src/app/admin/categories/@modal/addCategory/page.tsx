import { Modal } from "@/app/components/modal";
import ModalForm from "./form";

export default async function CategoryModal({
  searchParams,
}: {
  searchParams: any;
}) {
  return (
    <Modal>
      <ModalForm
        parent={
          (searchParams && Object.entries(searchParams).pop()?.[1]) || null
        }
        searchParams={searchParams}
      />
    </Modal>
  );
}
