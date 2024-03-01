import React from "react";

export default function layout({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: React.ReactNode;
}) {
  return (
    <>
      {children}
      {permission}
    </>
  );
}
