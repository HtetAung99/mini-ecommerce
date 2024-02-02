import React from "react";

export default function Layout({
  children,
  variantModal,
}: {
  children: React.ReactNode;
  variantModal: React.ReactNode;
}) {
  return (
    <div>
      {variantModal}
      {children}
    </div>
  );
}
