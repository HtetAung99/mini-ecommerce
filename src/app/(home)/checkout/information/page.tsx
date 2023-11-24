import React from "react";
import Checkout from "../../components/checkout";
import InformationColumn from "./information-column";

export default function CheckoutPage() {
  return (
    <div className="flex flex-row gap-5">
      <InformationColumn />
      <Checkout next={false} />
    </div>
  );
}
