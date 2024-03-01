import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import RoleTable from "../components/role-table";
import RoleFilter from "../components/role-filter";

export default function RoleManagement() {
  return (
    <TabsContent value="roles" forceMount={true}>
      <RoleFilter />
      <RoleTable />
    </TabsContent>
  );
}
