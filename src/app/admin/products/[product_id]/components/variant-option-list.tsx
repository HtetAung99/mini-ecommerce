import { Button } from "@/components/ui/button";
import { Delete, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

export default function VaraintOptionsList({
  variantOptions,
}: {
  variantOptions: any;
}) {
  const path = usePathname();

  return (
    <div className=" w-full">
      <span className="mb-5 flex flex-row items-center justify-between">
        <h4 className="text-lg font-bold leading-10 tracking-widest">
          Variants
        </h4>
        <Button asChild variant={"default"}>
          <Link href={`${path}/addVariant`}>Add new variant</Link>
        </Button>
      </span>
      {variantOptions.map((vo: any) => {
        return (
          <div className="flex w-full flex-col overflow-hidden p-2">
            <div className="flex flex-row items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-5 py-3 shadow-md">
              {Object.entries(vo).map(([key, value]: [string, any]) => {
                if (key !== "price") {
                  return (
                    <>
                      <span className="min-w-[100px] text-base font-medium capitalize">
                        {value}
                      </span>
                    </>
                  );
                }
              })}
              <span className="flex min-w-[150px] items-center justify-center  gap-5 border-l border-slate-300 pl-2  leading-8 tracking-wider">
                $ {vo.price}
                <Trash className=" cursor-pointer text-red-500" size={18} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
