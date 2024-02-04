import React, { useCallback, useEffect, useState } from "react";
import AttributeSelect from "./attribute-select";
import { AttributeWithAttributeValue } from "@/app/types";
import { ChevronRight } from "lucide-react";

export default function AttributeSelectList({
  selectedAttributes,
  setSelectedAttributes,
  attributes,
}: {
  selectedAttributes: any;
  setSelectedAttributes: any;
  attributes: AttributeWithAttributeValue[];
}) {
  return (
    <div className="w-full">
      <ul className="my-3 list-none text-start capitalize">
        {Object.entries(selectedAttributes).map(
          ([attribute, attributeValue]: [any, any]) => {
            return (
              <li className="my-2 flex w-full items-center px-2 text-sm font-semibold leading-9 tracking-widest">
                <div className="flex w-1/2 flex-row items-center gap-3">
                  <span className="w-1/3">{attribute}</span>
                  <ChevronRight className="pr-6" size={16} />
                  <span>{attributeValue.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newSelectedAttributes = { ...selectedAttributes };
                    delete newSelectedAttributes[attribute];
                    setSelectedAttributes(newSelectedAttributes);
                  }}
                  className="secondary-btn w-1/4"
                >
                  Delete
                </button>
              </li>
            );
          },
        )}
      </ul>
      <AttributeSelect
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        attributes={attributes.filter(
          (attribute) =>
            Object.keys(selectedAttributes).indexOf(attribute.name) === -1,
        )}
      />
    </div>
  );
}
