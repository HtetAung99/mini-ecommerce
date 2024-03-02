import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { headers } from "next/headers";

export default function UserManagementPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUrl = headers().get("x-pathname")?.split("/");

  return (
    <>
      <Tabs defaultValue={currentUrl?.at(-1)}>
        <TabsList className="mb-3 flex w-[30%] justify-between">
          <TabsTrigger asChild value="users">
            <Link href="/admin/users-management/users">Users</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="roles">
            <Link href="/admin/users-management/roles">Roles</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="permissions">
            <Link href="/admin/users-management/permissions">Permissions</Link>
          </TabsTrigger>
        </TabsList>
        <Separator className="px-5" />
        <div className="my-2 rounded-lg p-2 shadow-sm">{children}</div>
      </Tabs>
    </>
  );
}
