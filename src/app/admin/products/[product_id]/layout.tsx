import React from "react";

export default function Layout({
  children,
  productEdit,
  variantModal,
}: {
  children: React.ReactNode;
  productEdit: React.ReactNode;
  variantModal: React.ReactNode;
}) {
  return (
    <div>
      {productEdit}
      {variantModal}
      {children}
    </div>
  );
}
