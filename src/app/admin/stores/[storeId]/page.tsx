import React from "react";

export default function StorePage({ params }: { params: { storeId: string } }) {
  const { storeId } = params;
  console.log(storeId);
  return <div>StorePage</div>;
}
