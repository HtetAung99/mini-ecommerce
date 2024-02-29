import React from "react";
import GroupEditForm from "./components/gp-edit-form";
import { Modal } from "@/app/components/modal";
import prisma from "../../../../../../lib/prisma";

export default async function EditPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { gpId } = searchParams;
  const group = await prisma.group.findUnique({
    where: { id: gpId },
    include: { permissions: true },
  });
  const permissions = await prisma.permission.findMany();
  return (
    <Modal>
      <GroupEditForm group={group!} permissions={permissions} />
    </Modal>
  );
}
