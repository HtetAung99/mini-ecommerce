import React from "react";
import AttributeSelect from "./attribute-select";

export default function AttributeSelectList({
  selectedAttributes,
  setSelectedAttributes,
  attributes,
}: {
  selectedAttributes: any;
  setSelectedAttributes: any;
  attributes: any;
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
              </li>
            );
          },
        )}
        <AttributeSelect
          setSelectedAttributes={setSelectedAttributes}
          attributes={attributes}
        />
      </div>
    </div>
  );
}
