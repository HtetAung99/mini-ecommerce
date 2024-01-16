"use client";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Address } from "@prisma/client";
import SelectedAddress from "../shipping/selected-address";
import { log } from "console";

export default function AddressLists() {
  const session = useSession();
  const addresses = session.data?.user.addresses;
  const selectedAddress = session.data?.user.selectedAddress;
  const setSelectedAddress = async (address: Address) => {
    await session.update({ selectedAddress: address });
  };
  return (
    <div className=" flex flex-col gap-5 overflow-auto">
      {addresses?.map((address: Address) => (
        <div
          onClick={() => {
            setSelectedAddress(address);
          }}
          key={address.id}
          className={cn(
            "mx-5 rounded-md border  px-3",
            selectedAddress?.id === address.id
              ? "border-destructive"
              : "border-dashed border-primary",
          )}
        >
          <span className="inline-flex w-full p-4 text-sm">
            <p className="w-1/3 text-muted-foreground">Address Type:</p>
            <p className="grow ">{address?.name}</p>
          </span>
          <span className="inline-flex w-full p-4 text-sm">
            <p className="w-1/3 text-muted-foreground">Phone no.:</p>
            <p className="grow ">{address?.phoneNumber}</p>
          </span>
          <span className="inline-flex w-full p-4 text-sm">
            <p className="w-1/3 text-muted-foreground">Address:</p>
            <p className="grow ">
              {`${address?.address}, ${address?.city}, ${address?.state}, ${address?.postalCode}, ${address?.country}`}
            </p>
          </span>
          {address.default && (
            <Badge className="mb-5 ml-3">Default address</Badge>
          )}
        </div>
      ))}
    </div>
  );
}
