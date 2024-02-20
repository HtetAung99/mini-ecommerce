"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderBox() {
  const path = usePathname();

  return (
    <div className="mb-5 rounded-lg border border-slate-200 bg-white p-2  px-5 shadow-md">
      <h1 className="my-2 text-xl font-semibold">Admin Dashboard</h1>
      <div className="flex justify-between  py-2 font-semibold capitalize tracking-wide text-blue-500">
        <div className="flex flex-row items-center gap-4">
          {path
            ?.split("/")
            .slice(1)
            .map((p, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <span
                    className="text-xs font-medium tracking-wide"
                    key={index}
                  >
                    {p.split("-").join(" ")}
                  </span>{" "}
                  {index !== path.split("/").length - 2 && (
                    <ChevronRight className="ml-3" size={12} />
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex gap-5">
          {/* <Button
            className="w-[150px] border-red-500 text-sm font-semibold text-red-500 hover:border-red-600 hover:bg-transparent hover:font-semibold hover:text-red-600"
            variant={"outline"}
          >
            Discard Changes
          </Button>
          <Button
            className="w-[150px] bg-blue-500 text-sm font-semibold hover:bg-blue-700"
            variant={"default"}
          >
            Save Changes
          </Button> */}
        </div>
      </div>
    </div>
  );
}
