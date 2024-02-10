import { VariantWithProductAndAttributeValues } from "@/app/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderItem } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function AdminOrderTableRow({
  orderItem,
}: {
  orderItem: OrderItem;
}) {
  const [orderItemVariant, setOrderItemVariant] =
    useState<VariantWithProductAndAttributeValues>();
  const [variantPrice, setVariantPrice] = useState<number>(0);
  useEffect(() => {
    try {
      const data = fetch("/api/variants?id=" + orderItem.variantId).then(
        async (res) => {
          setOrderItemVariant(await res.json());
        },
      );
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    if (orderItemVariant) {
      setVariantPrice(
        orderItemVariant.product.price + orderItemVariant.priceDiff,
      );
    }
  }, [orderItemVariant]);
  return (
    <TableRow className="text-sm font-medium leading-7 text-slate-500">
      <TableCell>{orderItem.id}</TableCell>
      <TableCell className="flex flex-col gap-3">
        <span>{orderItemVariant?.product.title}</span>
        <div className="flex flex-row gap-2 capitalize">
          {orderItemVariant?.attributeValues.map((attr) => (
            <span>{attr.name}</span>
          ))}
        </div>
      </TableCell>
      <TableCell>{orderItem.quantity}</TableCell>
      <TableCell className="text-right tracking-wider">
        $ {variantPrice.toFixed(2)}
      </TableCell>
      <TableCell className="text-right tracking-wider">
        $ {(orderItem.quantity * variantPrice).toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
