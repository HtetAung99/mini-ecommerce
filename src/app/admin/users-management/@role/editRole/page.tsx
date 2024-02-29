import React from "react";
import RoleEditForm from "./components/edit-form";
import { Modal } from "@/app/components/modal";
import prisma from "../../../../../../lib/prisma";

export default async function RoleEdit({
  searchParams,
}: {
  searchParams: any;
}) {
  const { roleId } = searchParams;
  const role = await prisma.permissionRole.findUnique({
    where: { id: roleId },
    include: { permissions: true },
  });
  const permissions = await prisma.permission.findMany();
  return (
    <Modal>
      <RoleEditForm role={role!} permissions={permissions} />
    </Modal>
  );
}
