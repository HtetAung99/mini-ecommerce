"use client";

import React, { useState } from "react";
import ShippingInformation from "./shipping/shipping-info";
import PaymentInformation from "./payment/payment-info";
import CheckoutStage from "./checkout-stage";

export default function InformationColumn() {
  const [paymentIsOpen, setPaymentIsOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col  gap-7">
      <CheckoutStage stage={[true, false]} />
      <ShippingInformation setPaymentIsOpen={setPaymentIsOpen} />
      <PaymentInformation isOpen={paymentIsOpen} setIsOpen={setPaymentIsOpen} />
    </div>
  );
}
