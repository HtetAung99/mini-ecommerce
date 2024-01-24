import Link from "next/link";
import React from "react";

export default function OrderCardHeader() {
  return (
    <div className="flex flex-row  items-center justify-between border-l-4 border-slate-600 px-5 py-2 text-sm">
      <span className="flex-1 leading-8 tracking-wider">
        <strong>Online Order : </strong>BBY01-806830591220
      </span>
      <span className="basis-1/4 tracking-wide ">Nov 27, 2022</span>
      <Link
        className="basis-1/3 text-end font-medium tracking-wide text-accent-foreground"
        href={"#"}
      >
        See Details &gt;
      </Link>
    </div>
  );
}
