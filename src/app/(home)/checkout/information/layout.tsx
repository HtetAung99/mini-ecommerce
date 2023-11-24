import React from "react";

export default function CheckoutLayout({
  children,
  addressModal,
}: {
  children: React.ReactNode;
  addressModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {addressModal}
    </>
  );
}
