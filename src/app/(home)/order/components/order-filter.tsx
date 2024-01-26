"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function OrderFilter() {
  const filters = ["All Orders", "In Progress", "Cancelled"];
  const [selected, setSelected] = useState(0);
  return (
    <div className="my-3 flex w-full  gap-5 border-b">
      {filters.map((filter, idx) => (
        <div
          key={idx}
          onClick={() => setSelected(idx)}
          className={cn(
            " cursor-pointer px-2 text-base font-semibold leading-10 tracking-wide",
            selected == idx && "border-b-4 border-slate-600",
          )}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}
