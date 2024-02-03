import React, { useState } from "react";
import AttributeCommandBox from "./attribute-command-box";
import { AttributeWithAttributeValue } from "@/app/types";
import { AttributeValue } from "@prisma/client";
import AttributeValueCommandBox from "./attribute-value-command-box";

export default function AttributeSelect({
  attributes,
  setSelectedAttributes,
}: {
  attributes: AttributeWithAttributeValue[];
  setSelectedAttributes: any;
}) {
  const [selectedAttribute, setSelectedAttribute] =
    useState<AttributeWithAttributeValue>(attributes[0]);
  const [selectedAttributeValue, setSelectedAttributeValue] = useState<
    AttributeValue | undefined
  >(attributes[0].attributeValues[0]);

  return (
    <div className="flex w-full flex-row items-end gap-2">
      <AttributeCommandBox
        attributes={attributes}
        selectedAttribute={selectedAttribute}
        setSelectedAttribute={setSelectedAttribute}
        setSelectedAttributeValue={setSelectedAttributeValue}
      />
      <AttributeValueCommandBox
        attributeValues={selectedAttribute.attributeValues}
        selectedAttributeValue={selectedAttributeValue}
        setSelectedAttributeValue={setSelectedAttributeValue}
      />

      <button
        disabled={selectedAttributeValue === undefined}
        onClick={(e) => {
          e.preventDefault();
          setSelectedAttributes((prev: any) => {
            if (selectedAttributeValue) {
              return {
                ...prev,
                [selectedAttribute.name]: selectedAttributeValue,
              };
            }
          });
        }}
        className="mb-9 rounded-md bg-blue-500 px-2 py-1 text-sm text-white"
      >
        +
      </button>
    </div>
  );
}
