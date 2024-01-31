import React from "react";
import CartHeader from "./components/cart-header";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-[10vw] w-full">
      <CartHeader />
      {children}
    </div>
  );
}
