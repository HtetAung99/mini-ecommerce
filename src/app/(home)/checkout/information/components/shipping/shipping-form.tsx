import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction, useState } from "react";
import DeliveryOption from "./delivery-option";
import PickUpOption from "./pick-up-option";
import { Button } from "@/components/ui/button";

export default function ShippingForm({
  setIsOpen,
  setPaymentIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPaymentIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [option, setOption] = useState<string>("default");
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
      <Button
        onClick={() => {
          setIsOpen(false);
          setPaymentIsOpen(true);
        }}
        className="w-1/3 "
        variant={"default"}
      >
        Continue to Payment
      </Button>
    </div>
  );
}
