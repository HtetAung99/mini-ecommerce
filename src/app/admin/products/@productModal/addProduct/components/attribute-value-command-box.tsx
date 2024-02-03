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
import { AttributeValue } from "@prisma/client";
import { useState } from "react";

export default function AttributeValueCommandBox({
  attributeValues,
  selectedAttributeValue,
  setSelectedAttributeValue,
}: {
  attributeValues: AttributeValue[];
  selectedAttributeValue: AttributeValue | undefined;
  setSelectedAttributeValue: (attributeValue: AttributeValue) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className=" my-2 flex w-1/2 flex-col justify-start">
      <label
        className="mx-2 text-start text-sm font-medium leading-9 tracking-wide"
        htmlFor="category"
      >
        Attribute Value
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="my-2 justify-between bg-slate-200 capitalize"
          >
            {selectedAttributeValue
              ? attributeValues.find(
                  (attributeValue) =>
                    attributeValue.id === selectedAttributeValue.id,
                )?.name
              : "Selecte Value..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="bg-slate-200 ">
            <CommandInput placeholder="Search Value..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
              {attributeValues.map((attributeValue: AttributeValue) => (
                <CommandItem
                  className="capitalize"
                  key={attributeValue.id}
                  value={attributeValue.name}
                  onSelect={(currentValue) => {
                    setSelectedAttributeValue(attributeValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAttributeValue?.id === attributeValue.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {attributeValue.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
