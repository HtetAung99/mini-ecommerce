"use client";

import { useSocket } from "@/app/context/socket-provider";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@prisma/client";
import { useEffect, useState } from "react";

function OrderList({ orders }: { orders: Order[] }) {
  const [orderList, setOrderList] = useState<Order[]>(orders);

  const { socket, isConnected } = useSocket();
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected) {
      socket.on("order", (order: Order) => {
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
    <>
      {orderList.map((order: Order) => (
        <li key={order.id}>{order.id}</li>
      ))}
    </>
  );
}

export default OrderList;
