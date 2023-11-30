import React from "react";
import ShippingInformation from "./shipping/shipping-info";
import PaymentInformation from "./payment/payment-info";
import CheckoutStage from "./checkout-stage";

export default function InformationColumn() {
  return (
    <div className="flex w-full flex-col  gap-7">
      <CheckoutStage stage={[true, false]} />
      <ShippingInformation />
      <PaymentInformation />
    </div>
  );
}
