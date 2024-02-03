import React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AttributeWithAttributeValue } from "@/app/types";
import { AttributeValue } from "@prisma/client";

export default function AttributeCommandBox({
  attributes,
  selectedAttribute,
  setSelectedAttribute,
  setSelectedAttributeValue,
}: {
  attributes: AttributeWithAttributeValue[];
  selectedAttribute: AttributeWithAttributeValue;
  setSelectedAttribute: (attribute: AttributeWithAttributeValue) => void;
  setSelectedAttributeValue: (
    attributeValue: AttributeValue | undefined,
  ) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="my-2 flex w-1/2 flex-col justify-start">
      <label
        className="mx-2 text-start text-sm font-medium leading-9 tracking-wide"
        htmlFor="category"
      >
        Attribute
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="my-2 justify-between bg-slate-200  capitalize"
          >
            {selectedAttribute
              ? attributes.find(
                  (attribute) => attribute.id === selectedAttribute.id,
                )?.name
              : "Select Attribute..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="bg-slate-200">
            <CommandInput placeholder="Search Attribute..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {attributes.map((attribute: AttributeWithAttributeValue) => (
                <CommandItem
                  className="capitalize"
                  key={attribute.id}
                  value={attribute.name}
                  onSelect={(currentValue) => {
                    setSelectedAttribute(attribute);
                    if (attribute.name === "default") {
                      setSelectedAttributeValue(attribute.attributeValues[0]);
                    } else {
                      setSelectedAttributeValue(undefined);
                    }

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAttribute.id === attribute.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {attribute.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
