import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Pen, Truck } from "lucide-react";
import TermsConditions from "./terms-conditions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectedAddress from "./selected-address";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import AddressModal from "../addressModal/address-modal";

export default function DeliveryOption() {
  return (
    <>
      <div className="mt-4 flex w-full items-center justify-between ">
        <span className="w-1/3 font-semibold">
          <p>My Shipping Address</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => console.log("edit")}
              variant={"ghost"}
              className={cn(" flex items-center gap-4 text-base ")}
            >
              <Pen size="20px" /> <p>Edit</p>
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn(
              "top-[50%] max-h-[800px] w-[50%] overflow-auto shadow-xl",
            )}
          >
            <AddressModal title={"My shipping address"} />
          </DialogContent>
        </Dialog>
      </div>
      <SelectedAddress />
      <div className="mt-2 flex items-center gap-1 space-x-2">
        <Checkbox id="billing-address" />
        <label
          htmlFor="billing-address"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Billing address is same as shipping address
        </label>
      </div>
      <div className="mt-2 py-3">
        <p className="w-1/3  font-semibold">Shipping method</p>
        <div className="my-3 rounded-md border-2 border-yellow-400 p-5">
          <span className="flex flex-row items-center justify-between text-sm font-semibold">
            <span className="inline-flex items-center gap-3">
              <Truck size="20px" />
              <p>Standard</p>
            </span>
            <p>Free</p>
          </span>
        </div>
      </div>
      <TermsConditions />
      <div className="my-5">
        <span className="inline-flex w-full items-center gap-3">
          <p className="font-semibold">Add shipping information</p>
          <p className="text-sm font-semibold text-muted-foreground">
            (Optional)
          </p>
        </span>
        <Input
          className="mt-3"
          type="text"
          placeholder="Ex. Please leave at the front door."
        />
      </div>
    </>
  );
}
