import { OrderWithAllDetails } from "@/app/types";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminOrderItem({
  order,
}: {
  order: OrderWithAllDetails;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="mb-4 mt-2 grid grid-cols-5 rounded-md bg-slate-100 p-4 font-semibold leading-7 tracking-wider shadow-md">
        <span>Order Id</span>
        <span className="">Customer Info</span>
        <span className="">Amount Charged</span>
        <span className="">Order Status</span>
        <span className="s">Placed On</span>
      </div>
      <CollapsibleTrigger className="w-full">
        <div
          className={cn(
            "grid grid-cols-5 items-center rounded-md bg-sky-50 p-4 text-start text-sm font-medium tracking-wide ",
            isOpen ? "rounded-b-none shadow-none" : "rounded-md shadow-md",
          )}
        >
          <span className="">{order.id.split("-").slice(-1)}</span>
          <span className="flex flex-col text-xs font-light">
            <span className="mb-2 text-sm font-medium">
              {order.customer.name}
            </span>
            <span>{`${order.address.address}, ${order.address.city}`}</span>
            <span>{`${order.address.postalCode}, ${order.address.state}`}</span>
            <span>{`Phone: ${order.address.phoneNumber}`}</span>
          </span>
          <span className="">$ {order.totalAmount.toFixed(2)}</span>
          <span className="">{order.status.toLowerCase()}</span>
          <span className="">{order.createdAt.toLocaleString()}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="rounded-t-none border-0 bg-slate-50 shadow-md">
          <CardHeader>
            <CardTitle>MMSP</CardTitle>
          </CardHeader>
          <CardContent>Lee</CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
