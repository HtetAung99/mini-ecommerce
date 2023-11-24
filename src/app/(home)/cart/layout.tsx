import React from "react";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h5>{`Cart ( 3 )`}</h5>
      {children}
    </>
  );
}
