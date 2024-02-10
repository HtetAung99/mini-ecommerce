"use client";

import { OrderWithAllDetails } from "@/app/types";
import { OrderStatus } from "@prisma/client";
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
import { handleOrder } from "@/app/actions/order";

export default function AdminAction({ order }: { order: OrderWithAllDetails }) {
  return (
    <div>
      <h1 className="px-2 text-base font-medium leading-9 tracking-widest">
        Order Progress
      </h1>
      <div className="m-2 flex flex-col gap-2 rounded-lg border border-slate-200 p-2 text-sm leading-8 tracking-wide text-slate-600">
        <div className="flex w-full flex-row gap-4 px-4">
          <span className="w-40">Order Status</span>
          <span className="capitalize">{order.status.toLowerCase()}</span>
        </div>
        <div className="flex w-full flex-row gap-4 px-4">
          <span className="w-40">Payment Status</span>
          <span className="capitalize">
            {order.paymentStatus.toLowerCase()}
          </span>
        </div>
        <form className="my-2 flex justify-between px-4">
          {order.status !== OrderStatus.CANCELED &&
            order.status !== OrderStatus.DELIVERED && (
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
                    <AlertDialogAction
                      onClick={() =>
                        handleOrder(OrderStatus.CANCELED, order.id)
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          <ProceedOrder order={order} handleProceed={handleOrder} />
        </form>
      </div>
    </div>
  );
}

const ProceedOrder = ({
  order,
  handleProceed,
}: {
  order: OrderWithAllDetails;
  handleProceed: any;
}) => {
  switch (order.status) {
    case OrderStatus.CANCELED:
      return (
        <div className="flex flex-row gap-4 font-semibold text-red-500">
          <span className="w-40 flex-shrink-0">Cancelled on </span>
          <span className="flex-wrap">{order.updatedAt.toLocaleString()}</span>
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
                This action cannot be undone. This will automatically notify the
                customer that the order is shipped.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleProceed(OrderStatus.SHIPPED, order.id)}
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
                This action cannot be undone. This will automatically notify the
                customer that the order is delivered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleProceed(OrderStatus.DELIVERED, order.id)}
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
          <span className="flex-wrap">{order.updatedAt.toLocaleString()}</span>
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
