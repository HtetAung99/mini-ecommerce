import { Modal } from "@/app/components/modal";
import React from "react";
import PremissionFrom from "./components/permission-form";
import prisma from "../../../../../../../lib/prisma";
import { Entity, Permission } from "@prisma/client";

export default async function page() {
  //FIXME: need to change as utility function later
  const entities = await prisma.entity.findMany();
  return (
    <Modal>
      <PremissionFrom entities={entities} />
    </Modal>
  );
}
