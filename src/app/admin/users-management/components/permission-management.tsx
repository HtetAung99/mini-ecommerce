import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import PermissionFilter from "./permission-filter";
import PermissionTable from "./permission-table";

export default function PermissionManagement() {
  return (
    <TabsContent value="permissions">
      <PermissionFilter />
      <PermissionTable />
    </TabsContent>
  );
}
