import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function UserManagementPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="users">
      <TabsList className="mb-3 flex w-[30%] justify-between">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="roles">Roles</TabsTrigger>
        <TabsTrigger value="permissions">Permissions</TabsTrigger>
      </TabsList>
      <Separator className="px-5" />
      {children}
    </Tabs>
  );
}
