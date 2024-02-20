import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import RoleFilter from "./role-filter";
import RoleTable from "./role-table";

export default function RoleManagement() {
  return (
    <TabsContent value="roles">
      <RoleFilter />
      <RoleTable />
    </TabsContent>
  );
}
