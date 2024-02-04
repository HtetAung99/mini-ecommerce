"use client";
import { useCart } from "@/app/hooks/useCart";
import { CartItem, VariantWithProductAndAttributeValues } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderItem({ item }: { item: CartItem }) {
  const [cartItem, setCartItem] =
    useState<VariantWithProductAndAttributeValues | null>(null);

  const { addItemQuantity, reduceItemQuantity, removeItem, setItemQuantity } =
    useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/variants?id=${item.variantId}`);

        if (response.ok) {
          const data = await response.json();
          setCartItem(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [item]);
  if (!cartItem) return null;
  return (
    <div className="flex w-full items-center border-b border-slate-200 py-4">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/images/Dummy.jpeg" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 min-w-[12vw] space-y-1">
        <p className="text-sm font-medium leading-none">
          {cartItem?.product.title}
        </p>
        <p className="text-sm text-muted-foreground">
          {cartItem?.attributeValues
            .map((av) => {
              if (av.name !== "default") return av.name;
            })
            .join(" / ")}
        </p>
      </div>
      <div className="ml-auto space-y-1">
        <p className="text-sm font-medium leading-none">
          ${(cartItem?.priceDiff + cartItem?.product.price).toFixed(2)}
        </p>
        <p className="mt-1  text-xs text-destructive">save $100</p>
      </div>
      <div className="ml-auto font-medium">
        <Button
          onClick={() => reduceItemQuantity(item.variantId)}
          variant={"ghost"}
        >
          <Minus size={"12px"} />
        </Button>

        <input
          type="text"
          value={item.quantity}
          onChange={(e) => {
            setItemQuantity(item.variantId, Number(e.target.value));
          }}
          className={cn(
            "m-auto h-8 w-14 rounded-sm border p-2 text-center text-sm",
          )}
        />
        <Button
          onClick={() => addItemQuantity(item.variantId)}
          variant={"ghost"}
        >
          <Plus size={"12px"} />
        </Button>
      </div>
      <Button onClick={() => removeItem(item.variantId)} variant={"ghost"}>
        <Trash2Icon size={"18px"} />
      </Button>
    </div>
  );
}
