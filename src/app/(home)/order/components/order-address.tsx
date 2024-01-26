import React from "react";
import prisma from "../../../../../lib/prisma";

export default async function OrderAddress({
  addressId,
}: {
  addressId: number;
}) {
  const address = await prisma.address.findUnique({ where: { id: addressId } });
  return (
    <div className="flex basis-1/5 flex-col gap-4 py-4 text-sm font-light tracking-tight">
      <h4 className="font-semibold tracking-normal">Shipping Address</h4>
      <div>
        <p>{address?.name}</p>
        <p>{address?.address}</p>
        <p>67D</p>
        <p>
          {address?.city}, {address?.state} {address?.postalCode}
        </p>
      </div>
    </div>
  );
}
