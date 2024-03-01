import React from "react";

export default function layout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: React.ReactNode;
}) {
  return (
    <>
      {children}
      {role}
    </>
  );
}
