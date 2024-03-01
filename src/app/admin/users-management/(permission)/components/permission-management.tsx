import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import PermissionFilter from "./permission-filter";
import PermissionTable from "./permission-table";
import { Entity, Permission } from "@prisma/client";
import prisma from "../../../../../../lib/prisma";

export default async function PermissionManagement() {
  // FIXME: must move to utils later
  const permissions: (Permission & { entity: Entity })[] =
    await prisma.permission.findMany({
      include: { entity: true },
    });
  return (
    <TabsContent value="permissions">
      <PermissionFilter />
      <PermissionTable permissions={permissions} />
    </TabsContent>
  );
}
