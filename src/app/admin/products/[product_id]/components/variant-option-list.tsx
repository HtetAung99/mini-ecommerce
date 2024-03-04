import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";
import VariantDeleteBtn from "./variant-delete-btn";

export default function VaraintOptionsList({
  variantOptionsFromParent,
}: {
  variantOptionsFromParent: any;
}) {
  const path = usePathname();

  const [variantOptions, setVariantOptions] = React.useState<any>([]);

  useEffect(() => {
    setVariantOptions(variantOptionsFromParent);
  }, [variantOptionsFromParent]);
  return (
    <div className="max-h-[40vh] w-full overflow-auto">
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
          <div key={vo.id} className="flex w-full flex-col overflow-hidden p-2">
            <div className="flex flex-row items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-5 py-3 shadow-md">
              {Object.entries(vo).map(([key, value]: [string, any]) => {
                if (key === "id") {
                  return;
                }
                if (key !== "price") {
                  return (
                    <>
                      <span
                        key={`${key}${value}`}
                        className="min-w-[100px] text-base font-medium capitalize"
                      >
                        {value}
                      </span>
                    </>
                  );
                }
              })}
              <span className="flex min-w-[150px] items-center justify-center  gap-5 border-l border-slate-300 pl-2  leading-8 tracking-wider">
                $ {vo.price}
                <VariantDeleteBtn
                  key={vo.id}
                  setVariantOptions={setVariantOptions}
                  id={vo.id}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
