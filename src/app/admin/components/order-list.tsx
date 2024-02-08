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
      {orderList.map((order: OrderWithAllDetails) => (
        <AdminOrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
