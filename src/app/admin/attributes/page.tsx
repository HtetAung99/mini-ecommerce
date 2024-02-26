import { getAttributes } from "@/app/utils/attributes";
import { AttributeValue } from "@prisma/client";
import React from "react";
import AttributeAddForm from "./attr-add-form";
import AttributeValueAddForm from "./attrVal-add-form";
import { cn } from "@/lib/utils";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

async function AttributesPage({ searchParams }: { searchParams: any }) {
  const attributes = await getAttributes();

  const selectedId = Number(searchParams.selectedId) || null;

  return (
    <TooltipProvider>
      <div className=" max-h-[72vh] overflow-auto px-2">
        <h1 className=" pb-4 text-lg font-semibold leading-9 tracking-wider">
          Attributes
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <div className=" flex w-full flex-col">
            <AttributeAddForm />
            <ul className="px-3 py-2">
              {attributes.map((attribute) => (
                <li
                  key={attribute.id}
                  className={cn(
                    "mt-4 text-sm font-medium leading-7 tracking-wide",
                    attribute.id === selectedId && "font-bold text-blue-500",
                  )}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        className="capitalize "
                        href={`/admin/attributes?selectedId=${attribute.id}`}
                        key={attribute.id}
                      >
                        {attribute.name}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Link
                        className="text-sm font-semibold text-blue-500"
                        href={
                          "/admin/attributes/editName?attrId=" + attribute.id
                        }
                      >
                        Edit
                      </Link>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {selectedId ? (
              <div className="">
                <AttributeValueAddForm
                  attribute={attributes.filter((a) => a.id === selectedId)[0]}
                />
                <ul className="px-3 py-2">
                  {attributes.filter((a) => a.id === selectedId)[0].name !==
                    "default" &&
                    attributes
                      .filter((attribute) => attribute.id === selectedId)[0]
                      .attributeValues.map((attrVal: AttributeValue) => (
                        <li
                          className="mt-4 text-sm font-medium capitalize leading-7 tracking-wide"
                          key={attrVal.id}
                        >
                          <Tooltip>
                            <TooltipTrigger className="capitalize ">
                              {attrVal.name}
                            </TooltipTrigger>
                            <TooltipContent>
                              <Link
                                className="text-sm font-semibold text-blue-500"
                                href={
                                  "/admin/attributes/editValue?attrId=" +
                                  selectedId +
                                  "&attrValId=" +
                                  attrVal.id
                                }
                              >
                                Edit
                              </Link>
                            </TooltipContent>
                          </Tooltip>
                        </li>
                      ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default AttributesPage;
