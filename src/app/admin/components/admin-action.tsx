"use client";
import { OrderWithAllDetails } from "@/app/types";
import { OrderStatus } from "@prisma/client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Router } from "lucide-react";

export default function AdminAction({ order }: { order: OrderWithAllDetails }) {
  const { toast } = useToast();
  const [orderState, setOrderState] = useState<OrderWithAllDetails>(order);
  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/order`, {
        method: "PUT",
        cache: "no-cache",
        body: JSON.stringify({
          orderId: order.id,
          orderStatus: OrderStatus.CANCELED,
        }),
      });
      if (response.ok) {
        setOrderState({ ...orderState, status: OrderStatus.CANCELED });
        toast({ title: "Order Cancelled!", duration: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error cancelling order!", duration: 3000 });
    }
  };
  const handleProceed = async (orderStatus: OrderStatus) => {
    try {
      const response = await fetch(`/api/order`, {
        method: "PUT",
        cache: "no-cache",
        body: JSON.stringify({
          orderId: order.id,
          orderStatus,
        }),
      });
      if (response.ok) {
        setOrderState({ ...orderState, status: orderStatus });
        toast({ title: "Order Updated!", duration: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error updating order!", duration: 3000 });
    }
  };
  const proceedOrder = () => {
    switch (orderState.status) {
      case OrderStatus.CANCELED:
        return (
          <div className="flex flex-row gap-4 font-semibold text-red-500">
            <span className="w-40 flex-shrink-0">Cancelled on </span>
            <span className="flex-wrap">
              {orderState.updatedAt.toLocaleString()}
            </span>
          </div>
        );
      case OrderStatus.PROCESSING:
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="primary-btn">Ready to be shipped</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will automatically notify
                  the customer that the order is shipped.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleProceed(OrderStatus.SHIPPED)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      case OrderStatus.SHIPPED:
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="primary-btn">Delivered</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will automatically notify
                  the customer that the order is delivered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleProceed(OrderStatus.DELIVERED)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      case OrderStatus.DELIVERED:
        return (
          <div className="flex flex-row gap-4 font-semibold text-blue-500">
            <span className="w-40 flex-shrink-0">Delivered on </span>
            <span className="flex-wrap">
              {orderState.updatedAt.toLocaleString()}
            </span>
          </div>
        );
      default:
        return (
          <button className="primary-btn" disabled={true}>
            Can't proceed the order!
          </button>
        );
    }
  };
  return (
    <div>
      <h1 className="px-2 text-base font-medium leading-9 tracking-widest">
        Order Progress
      </h1>
      <div className="m-2 flex flex-col gap-2 rounded-lg border border-slate-200 p-2 text-sm leading-8 tracking-wide text-slate-600">
        <div className="flex w-full flex-row gap-4 px-4">
          <span className="w-40">Order Status</span>
          <span className="capitalize">{orderState.status.toLowerCase()}</span>
        </div>
        <div className="flex w-full flex-row gap-4 px-4">
          <span className="w-40">Payment Status</span>
          <span className="capitalize">
            {orderState.paymentStatus.toLowerCase()}
          </span>
        </div>
        <div className="my-2 flex justify-between px-4">
          {orderState.status !== OrderStatus.CANCELED &&
            orderState.status !== OrderStatus.DELIVERED && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="secondary-btn">Cancel</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will automatically
                      refund the customer and remove the order from the system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          {proceedOrder()}
        </div>
      </div>
    </div>
  );
}
