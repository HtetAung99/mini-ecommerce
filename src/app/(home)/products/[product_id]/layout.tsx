import React from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-[10vw]">{children}</div>;
}
