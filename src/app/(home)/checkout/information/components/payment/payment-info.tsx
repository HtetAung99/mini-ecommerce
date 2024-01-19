"use client";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import PaymentMethod from "./payment-method";
import { useSession } from "next-auth/react";
import { OrderContext } from "@/app/context/order-provider";
import StripePayment from "./stripe-payment";

export default function PaymentInformation({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const selectAddress = useSession().data?.user.selectedAddress;
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div>
      {clicked && !selectAddress && (
        <span className="inline-flex pb-3 text-base text-red-600">
          Please provide shipping information!
        </span>
      )}
      <Collapsible
        onClick={() => setClicked(true)}
        open={isOpen && selectAddress != null}
        onOpenChange={setIsOpen}
        className="cursor-pointer rounded-lg bg-secondary"
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex  flex-row items-center justify-between rounded-t-lg bg-black p-2 text-xl font-semibold  text-white"
        >
          <div className="flex items-center gap-5 pl-4">
            <h6 className="rounded-full bg-white p-2 text-base  leading-none text-black">
              2
            </h6>
            Payment
          </div>
        </div>

        <CollapsibleContent className="px-6 py-2">
          {/* <PaymentMethod /> */}
          <StripePayment />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
