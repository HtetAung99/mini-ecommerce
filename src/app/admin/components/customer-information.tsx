import { OrderWithAllDetails } from "@/app/types";
import React from "react";

export default function CustomerInformation({
  order,
}: {
  order: OrderWithAllDetails;
}) {
  const customer = order.customer;
  return (
    <>
      <h1 className="px-2 text-base font-medium leading-9 tracking-widest">
        Customer Information
      </h1>
      <div className="m-2 flex flex-col rounded-lg border border-slate-200 p-2 text-sm font-medium leading-7 tracking-wide text-slate-600">
        <div className="m-2">
          <h4 className="text-slate-400">Name</h4>
          <p className="">{customer.name}</p>
        </div>
        <div className="m-2">
          <h4 className="text-slate-400">Email</h4>
          <p className="">{customer.email}</p>
        </div>
        <div className="m-2 leading-7">
          <h4 className="text-slate-400">Shipping Address</h4>
          <p className="font-medium">
            {order.address.address}, {order.address.city}
          </p>
          <p className="font-medium">
            {order.address.postalCode}, {order.address.state}
          </p>
          <p className="font-medium tracking-widest">
            {order.address.phoneNumber}
          </p>
        </div>
        <div className="m-2">
          <h4 className="text-slate-400">Shipping Type</h4>
          <p className="flex-wrap font-medium capitalize">
            {order.shippingType.toLowerCase()} (
            {order.shippingMethod.toLowerCase()})
          </p>
        </div>
      </div>
    </>
  );
}
