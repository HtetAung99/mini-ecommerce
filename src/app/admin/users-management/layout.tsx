import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function UserManagementPage({
  children,
  permission,
  role,
}: {
  children: React.ReactNode;
  permission: React.ReactNode;
  role: React.ReactNode;
}) {
  return (
    <>
      {role}
      {permission}
      <Tabs defaultValue="users">
        <TabsList className="mb-3 flex w-[30%] justify-between">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <Separator className="px-5" />
        {children}
      </Tabs>
    </>
  );
}
