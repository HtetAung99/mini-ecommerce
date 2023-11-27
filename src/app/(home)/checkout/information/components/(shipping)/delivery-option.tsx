import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck } from "lucide-react";
import TermsConditions from "./terms-conditions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectedAddress from "./selected-address";

export default function DeliveryOption() {
  return (
    <>
      <SelectedAddress
        withTitle={true}
        title={"Shipping address"}
        edit={true}
      />
      <div className="flex mt-2 items-center space-x-2 gap-1">
        <Checkbox id="billing-address" />
        <label
          htmlFor="billing-address"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Billing address is same as shipping address
        </label>
      </div>
      <div className="mt-2 py-3">
        <p className="w-1/3  font-semibold">Shipping method</p>
        <div className="border-2 border-yellow-400 rounded-md my-3 p-5">
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
      <Button className="w-1/3 " variant={"default"}>
        Continue to Payment
      </Button>
    </>
  );
}
