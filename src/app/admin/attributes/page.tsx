import { getAttributes } from "@/app/utils/attributes";
import { AttributeValue } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AttributeAddForm from "./attr-add-form";
import AttributeValueAddForm from "./attrVal-add-form";
import { cn } from "@/lib/utils";

async function AttributesPage({ searchParams }: { searchParams: any }) {
  const attributes = await getAttributes();

  const selectedId = Number(searchParams.selectedId) || null;

  return (
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
                className={cn(
                  "mt-4 text-sm font-medium capitalize leading-7 tracking-wide",
                  attribute.id === selectedId && "font-bold text-blue-500",
                )}
              >
                <Link
                  href={`/admin/attributes?selectedId=${attribute.id}`}
                  key={attribute.id}
                >
                  {attribute.name}
                </Link>
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
                        {attrVal.name}
                      </li>
                    ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AttributesPage;
