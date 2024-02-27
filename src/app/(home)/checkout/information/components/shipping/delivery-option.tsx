import React, { useContext } from "react";
import { Pen, Truck } from "lucide-react";
import TermsConditions from "./terms-conditions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectedAddress from "./selected-address";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import AddressModal from "../addressModal/address-modal";
import { OrderContext, shippingConstants } from "@/app/context/order-provider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { updateDefault } from "@/app/actions/address";

export default function DeliveryOption() {
  const session = useSession();
  const selectedAddress = session.data?.user.selectedAddress;
  const { shippingMethod, setShippingMethod } = useContext(OrderContext);
  const handleCheckChange = async (val: boolean) => {
    try {
      await updateDefault(val, session.data?.user.id!, selectedAddress!.id);
      session.update({
        isUpdateDefault: true,
        selectedAddressId: selectedAddress?.id,
        val,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="mt-4 flex w-full items-center justify-between ">
        <span className="w-1/3 font-semibold">
          <p>My Shipping Address</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className={cn(" flex items-center gap-4 text-base ")}
            >
              <Pen size="20px" />
              <p>Edit</p>
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
      <div className="mb-6 flex flex-row items-center gap-3 p-2 font-semibold leading-10 tracking-wider">
        <Checkbox
          onCheckedChange={(val: boolean) => handleCheckChange(val)}
          checked={selectedAddress?.default}
        />
        <Label htmlFor="setDefault">Set as Default Address</Label>
      </div>
      {/* <div className="mt-2 flex items-center gap-1 space-x-2">
        <Checkbox id="billing-address" />
        <label
          htmlFor="billing-address"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Billing address is same as shipping address
        </label>
      </div> */}
      <div className="pb-3">
        <p className="w-1/3  font-semibold">Shipping method</p>

        {Object.entries(shippingConstants).map(([key, value]) => (
          <div
            key={key}
            onClick={() => setShippingMethod(key)}
            className={cn(
              "my-3 rounded-md border-2 p-5",
              key === shippingMethod && "border-yellow-400",
            )}
          >
            <span className="flex flex-row items-center justify-between text-sm font-semibold">
              <span className="inline-flex items-center gap-3">
                <Truck size="20px" />
                <p className="capitalize">
                  {key.toLowerCase()} {value.duration}
                </p>
              </span>
              <p>$ {value.fee}</p>
            </span>
          </div>
        ))}
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
