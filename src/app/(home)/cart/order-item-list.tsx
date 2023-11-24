import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import React from "react";
import OrderItem from "./order-item";

export default function OrderItemList() {
  return (
    <div className="grow max-h-[38vw] py-3 px-1 mt-5 overflow-x-auto">
      {Array.from({ length: 20 }).map((_, i) => (
        <OrderItem />
      ))}
    </div>
  );
}
