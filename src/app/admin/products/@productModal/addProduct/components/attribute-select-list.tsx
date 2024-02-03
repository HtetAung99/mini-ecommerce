import React from "react";
import AttributeSelect from "./attribute-select";
import { AttributeWithAttributeValue } from "@/app/types";

export default function AttributeSelectList({
  selectedAttributes,
  setSelectedAttributes,
  attributes,
}: {
  selectedAttributes: any;
  setSelectedAttributes: any;
  attributes: AttributeWithAttributeValue[];
}) {
  console.log(selectedAttributes);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-10 tracking-wide">
          Product's Default Variant
        </h3>
      </div>
      <div className="flex flex-col">
        {Object.entries(selectedAttributes).map(
          ([attribute, attributeValue]: [any, any]) => {
            return (
              <li>
                {attribute} - {attributeValue.name}
                <button
                  onClick={() => {
                    const newSelectedAttributes = { ...selectedAttributes };
                    delete newSelectedAttributes[attribute];
                    setSelectedAttributes(newSelectedAttributes);
                  }}
                  className="bg-red-300 p-1"
                >
                  Delete
                </button>
              </li>
            );
          },
        )}
        <AttributeSelect
          setSelectedAttributes={setSelectedAttributes}
          attributes={attributes.filter(
            (attribute) =>
              Object.keys(selectedAttributes).indexOf(attribute.name) === -1,
          )}
        />
      </div>
    </div>
  );
}
