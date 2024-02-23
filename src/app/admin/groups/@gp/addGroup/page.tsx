import { Modal } from "@/app/components/modal";
import React from "react";
import GroupForm from "./components/group-form";
import prisma from "../../../../../../lib/prisma";

export default async function GroupAddPage() {
  //FIXME: need to change to utils later
  const permissions = await prisma.permission.findMany();
  return (
    <Modal>
      <GroupForm permissions={permissions} />
    </Modal>
  );
}
