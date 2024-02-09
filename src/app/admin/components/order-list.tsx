"use client";

import { useSocket } from "@/app/context/socket-provider";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

import { OrderWithAllDetails } from "@/app/types";
import AdminOrderItem from "./admin-order-item";

function OrderList({ orders }: { orders: OrderWithAllDetails[] }) {
  const [orderList, setOrderList] = useState<OrderWithAllDetails[]>(orders);

  const { socket, isConnected } = useSocket();
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected) {
      socket.on("order", (order: OrderWithAllDetails) => {
        setOrderList([...orderList, order]);

        toast({
          title: "New Order Received!",
          description: `New order: ${order.id}`,
          duration: 5000,
        });
      });
    }
  }, [socket, isConnected]);

  return (
    <div>
      <div className="mb-4 mt-2 grid grid-cols-5 rounded-md bg-slate-100 p-4 font-semibold leading-7 tracking-wider shadow-md">
        <span>Order Id</span>
        <span className="">Customer Info</span>
        <span className="">Amount Charged</span>
        <span className="">Order Status</span>
        <span className="">Placed On</span>
      </div>
      {orderList.map((order: OrderWithAllDetails) => (
        <AdminOrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
