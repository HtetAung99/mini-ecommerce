import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

import DeliveryOption from "./delivery-option";
import PickUpOption from "./pick-up-option";

export default function ShippingForm() {
  const [option, setOption] = React.useState("default");
  return (
    <div className="mb-4 flex flex-col">
      <div className="mt-2 border-b border-slate-300 pb-5">
        <p className="my-3 w-1/3 font-semibold">Shipping Type</p>
        <RadioGroup
          onValueChange={setOption}
          className="mx-3 gap-4"
          defaultValue={option}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Pick up at store</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem disabled={true} value="compact" id="r3" />
            <Label htmlFor="r3">Collect at store in 1 hour</Label>
          </div>
        </RadioGroup>
      </div>
      {option === "default" && <DeliveryOption />}
      {option === "comfortable" && <PickUpOption />}
    </div>
  );
}
