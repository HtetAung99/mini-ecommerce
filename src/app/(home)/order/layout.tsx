import React from "react";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-auto w-[80%] p-1">{children}</div>;
}
