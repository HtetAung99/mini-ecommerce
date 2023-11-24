import { Button } from "@/components/ui/button";

import React from "react";
import ShippingInformation from "./shipping-info";
import PaymentInformation from "./payment-info";

export default function InformationColumn() {
  return (
    <div className="flex flex-col w-full">
      <ShippingInformation />
      <PaymentInformation />
    </div>
  );
}
