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
      <DrawerTrigger>
        <Button className="flex items-center justify-around gap-3">
          <CreditCard />
          Buy Now
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/3 px-7">
        <DrawerHeader>
          <DrawerTitle className="mb-2">
            How many items of this type would you like to buy now?
          </DrawerTitle>
          <DrawerDescription className="flex flex-col items-center">
            <span className="self-start">
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
                  if (currentQty > 0) setQty(currentQty);
                  else setQty(1);
                }}
                className="w-1/2"
                type="number"
                id="qty"
                value={qty}
              />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="m-auto flex w-1/2 flex-row justify-center gap-10">
          <Button
            className="flex w-32 items-center justify-around gap-3"
            onClick={() => handleBuyNow(qty)}
          >
            <CreditCard />
            Buy Now
          </Button>
          <DrawerClose>
            <Button className="w-32" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
