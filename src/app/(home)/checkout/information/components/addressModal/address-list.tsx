"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Address } from "@prisma/client";
import RemoveButton from "./address-remove-btn";

export default function AddressLists() {
  const session = useSession();
  const addresses = session.data?.user.addresses;
  const selectedAddress = session.data?.user.selectedAddress;
  const setSelectedAddress = async (address: Address) => {
    await session.update({ selectedAddress: address });
  };

  return (
    <div className=" flex flex-col gap-5 overflow-auto pb-5">
      {addresses?.map((address: Address) => (
        <div
          onClick={() => {
            setSelectedAddress(address);
          }}
          key={address.id}
          className={cn(
            "relative mx-5 rounded-md border-2 p-2",
            selectedAddress?.id === address.id
              ? "border-destructive"
              : "border-dashed border-primary",
          )}
        >
          <RemoveButton id={address.id} />
          <span className="inline-flex w-full px-4 py-2 text-sm">
            <p className="w-1/3 text-muted-foreground">Address Type:</p>
            <p className="grow ">{address?.name}</p>
          </span>
          <span className="inline-flex w-full px-4 py-2 text-sm">
            <p className="w-1/3 text-muted-foreground">Phone no.:</p>
            <p className="grow ">{address?.phoneNumber}</p>
          </span>
          <span className="inline-flex w-full px-4 py-2 text-sm">
            <p className="w-1/3 text-muted-foreground">Address:</p>
            <p className="grow ">
              {`${address?.address}, ${address?.city}, ${address?.state}, ${address?.postalCode}, ${address?.country}`}
            </p>
          </span>
          {address.default && (
            <Badge className="mb-2 ml-3 mt-3">Default address</Badge>
          )}
        </div>
      ))}
    </div>
  );
}
