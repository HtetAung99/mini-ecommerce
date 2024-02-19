import React from "react";
import Checkout from "../../components/checkout";
import InformationColumn from "./components/information-column";
import { OrderProvider } from "@/app/context/order-provider";

export default function CheckoutPage() {
  return (
    <OrderProvider>
      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
        <InformationColumn />
        <Checkout next={false} />
      </div>
    </OrderProvider>
  );
}
