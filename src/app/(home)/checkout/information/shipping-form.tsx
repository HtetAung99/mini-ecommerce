import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ShippingAddress from "./shipping-address";
import { Checkbox } from "@/components/ui/checkbox";
import { Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TermsConditions from "./terms-conditions";

export default function ShippingForm() {
  return (
    <div className="flex flex-col mb-4">
      <div className="mt-2 border-b pb-5 border-slate-300">
        <p className="w-1/3 font-semibold my-3">Shipping Type</p>
        <RadioGroup className="mx-3 gap-4" defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Pick up at store</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Collect at store in 1 hour</Label>
          </div>
        </RadioGroup>
      </div>
      <ShippingAddress withTitle={true} edit={true} />
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
    </div>
  );
}
