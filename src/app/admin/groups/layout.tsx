import React from "react";

export default function GroupLayout({
  children,
  gp,
}: {
  children: React.ReactNode;
  gp: React.ReactNode;
}) {
  return (
    <>
      {gp}
      {children}
    </>
  );
}
