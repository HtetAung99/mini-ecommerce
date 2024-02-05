import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";

export default function ProductLayout({
  children,
  productModal,
}: {
  children: React.ReactNode;
  productModal: React.ReactNode;
}) {
  return (
    <div>
      {productModal}
      {children}
    </div>
  );
}
