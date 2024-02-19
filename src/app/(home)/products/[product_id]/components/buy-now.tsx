"use client";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BuyNow({ handleBuyNow }: { handleBuyNow: any }) {
  const [qty, setQty] = useState<number>(1);

  return (
    <Drawer>
      <DrawerTrigger className="w-full md:w-fit">
        <Button className="flex w-full items-center gap-3 md:w-fit md:justify-around ">
          <CreditCard />
          Buy Now
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[45%] px-7 md:h-1/3">
        <DrawerHeader>
          <DrawerTitle className="mb-2 leading-8">
            How many items of this type would you like to buy now?
          </DrawerTitle>
          <DrawerDescription className="mt-4 flex flex-col items-center md:mt-0">
            <span className="self-start text-left">
              Please select the quantity of items you wish to purchase. You can
              adjust the quantity here.
            </span>
            <div className="mx-auto my-3 flex flex-row items-center gap-9 py-2">
              <Label
                className="text-lg font-bold leading-9 tracking-wider"
                htmlFor="qty"
              >
                Quantity:
              </Label>
              <Input
                onChange={(e) => {
                  const currentQty = Number(e.target.value);
                  if (currentQty >= 0) setQty(currentQty);
                  else setQty(0);
                }}
                className="mt-3 w-1/2"
                type="number"
                id="qty"
                value={qty}
              />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="m-auto flex w-full flex-row justify-center gap-10 md:w-1/2">
          <Button
            className="flex w-full items-center gap-3 md:w-32 md:justify-around"
            onClick={() => handleBuyNow(qty)}
          >
            <CreditCard />
            Buy Now
          </Button>
          <DrawerClose className="hidden md:flex ">
            <Button className="w-full md:w-32" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
