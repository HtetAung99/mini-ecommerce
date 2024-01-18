import React from "react";
import Checkout from "../../components/checkout";
import InformationColumn from "./components/information-column";
import { OrderProvider } from "@/app/context/order-provider";

export default function CheckoutPage() {
  return (
    <OrderProvider>
      <div className="flex flex-row gap-5">
        <InformationColumn />
        <Checkout next={false} />
      </div>
    </OrderProvider>
  );
}
