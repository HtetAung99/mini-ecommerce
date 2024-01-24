import Link from "next/link";
import React from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import OrderCardHeader from "./order_card_header";
import OrderCardBody from "./order_card_body";

export default function OrderCard() {
  return (
    <div className="w-full rounded-sm border border-slate-200 bg-[#F8F8F8] shadow-lg">
      <OrderCardHeader />
      <OrderCardBody />
    </div>
  );
}
