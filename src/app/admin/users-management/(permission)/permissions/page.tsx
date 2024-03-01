import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";

import { Entity, Permission } from "@prisma/client";
import prisma from "../../../../../../lib/prisma";
import PermissionFilter from "../components/permission-filter";
import PermissionTable from "../components/permission-table";

export default async function PermissionManagementPage() {
  // FIXME: must move to utils later
  const permissions: (Permission & { entity: Entity })[] =
    await prisma.permission.findMany({
      include: { entity: true },
    });
  return (
    <TabsContent value="permissions" forceMount={true}>
      <PermissionFilter />
      <PermissionTable permissions={permissions} />
    </TabsContent>
  );
}
