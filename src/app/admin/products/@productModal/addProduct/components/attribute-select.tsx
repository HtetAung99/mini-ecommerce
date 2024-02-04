import React, { useState } from "react";
import AttributeCommandBox from "./attribute-command-box";
import { AttributeWithAttributeValue } from "@/app/types";
import { AttributeValue } from "@prisma/client";
import AttributeValueCommandBox from "./attribute-value-command-box";
import { set } from "react-hook-form";

export default function AttributeSelect({
  attributes,
  selectedAttributes,
  setSelectedAttributes,
}: {
  attributes: AttributeWithAttributeValue[];
  selectedAttributes: any;
  setSelectedAttributes: any;
}) {
  const [selectedAttribute, setSelectedAttribute] =
    useState<AttributeWithAttributeValue>(attributes[0]);
  const [selectedAttributeValue, setSelectedAttributeValue] =
    useState<AttributeValue | null>(
      selectedAttribute?.name === "default"
        ? selectedAttribute.attributeValues[0]
        : null,
    );

  const [error, setError] = useState<string | null>();
  if (Object.keys(selectedAttributes).includes("default")) return;
  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-row gap-2">
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
          // disabled={!selectedAttributeValue}
          onClick={(e) => {
            e.preventDefault();
            if (selectedAttributeValue) {
              setError(null);
              setSelectedAttributes((prev: any) => {
                if (selectedAttribute.name === "default") {
                  return { [selectedAttribute.name]: selectedAttributeValue };
                }
                return {
                  ...prev,
                  [selectedAttribute.name]: selectedAttributeValue,
                };
              });
              setSelectedAttributeValue(null);
              setSelectedAttribute((prev) => {
                return prev === attributes[0] ? attributes[1] : attributes[0];
              });
            } else {
              setError("Please choose a value!");
            }
            console.log(error);
          }}
          className="mb-4 mt-12 rounded-md bg-blue-500 px-2 py-1 text-sm text-white"
        >
          +
        </button>
      </div>
      {error && (
        <p className="text-xs font-light italic leading-5 tracking-wide text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
