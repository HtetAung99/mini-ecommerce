import { Modal } from "@/app/components/modal";
import React from "react";
import AddRoleForm from "./components/role-form";
import prisma from "../../../../../../lib/prisma";

export default async function AddRolePage() {
  //FIXME: need to change to utils
  const permissions = await prisma.permission.findMany();

  return (
    <Modal>
      <AddRoleForm permissions={permissions} />
    </Modal>
  );
}
