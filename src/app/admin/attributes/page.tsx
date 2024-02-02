import { addAttribute } from "@/app/actions/attribute";
import { getAttributes } from "@/app/utils/attributes";
import { AttributeValue } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AttributeAddForm from "./attr-add-form";
import AttributeValueAddForm from "./attrVal-add-form";

async function AttributesPage({ searchParams }: { searchParams: any }) {
  const attributes = await getAttributes();

  const selectedId = Number(searchParams.selectedId) || null;

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Attributes</h1>
        <AttributeAddForm />
        <ul>
          {attributes.map((attribute) => (
            <li>
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
          <>
            <AttributeValueAddForm
              attribute={attributes.filter((a) => a.id === selectedId)[0]}
            />
            <ul>
              {attributes
                .filter((attribute) => attribute.id === selectedId)[0]
                .attributeValues.map((attrVal: AttributeValue) => (
                  <li key={attrVal.id}>{attrVal.name}</li>
                ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AttributesPage;
