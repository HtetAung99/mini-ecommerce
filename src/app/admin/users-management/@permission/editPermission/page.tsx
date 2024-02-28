import { Modal } from "@/app/components/modal";
import React from "react";
import prisma from "../../../../../../lib/prisma";
import PremissionEditFrom from "./components/edit-form";

export default async function page({ searchParams }: { searchParams: any }) {
  //FIXME: need to change as utility function later
  const entities = await prisma.entity.findMany();
  const { permissionId } = searchParams;
  const targetPermission = await prisma.permission.findUnique({
    where: { id: permissionId },
  });
  return (
    <Modal>
      <PremissionEditFrom permission={targetPermission!} entities={entities} />
    </Modal>
  );
}
