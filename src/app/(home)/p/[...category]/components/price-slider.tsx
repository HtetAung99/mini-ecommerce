"use client";
import { useState } from "react";
import { Root, Track, Thumb, Range } from "@radix-ui/react-slider";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function PriceSlider() {
  const [lowest, setLowest] = useState(10);
  const [highest, setHighest] = useState(4000);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const fullPath = usePathname();
  const searchParams = Array.from(useSearchParams().entries());
  const paramsWithoutPrice = searchParams
    .filter(([key, value]) => key !== "price")
    .reduce((prev, [key, value]) => `${prev}${key}=${value}&`, "");
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger className="flex w-full justify-between items-center mb-2">
          <h4 className="text-md  font-medium leading-none">Price Range</h4>
          {open ? <Minus size={"14px"} /> : <Plus size={"14px"} />}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <Root
          className="relative flex w-full items-center my-4"
          defaultValue={[lowest, highest]}
          min={10}
          max={4000}
          value={[lowest, highest]}
          onValueChange={(value) => {
            setLowest(value[0]);
            setHighest(value[1]);
            router.push(
              `${fullPath}?${paramsWithoutPrice}price=${value[0]}-${value[1]}`
            );
          }}
          step={5}>
          <Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <Range className="absolute h-full bg-primary" />
          </Track>
          <Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50" />
          <Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50" />
        </Root>
        <div className=" px-3 flex justify-between items-center">
          <Input
            type="number"
            className="w-[30%] text-center"
            value={lowest}
            onChange={(e) => setLowest(Number(e.target.value))}
          />
          -
          <Input
            type="number"
            className="w-[30%] text-center"
            value={highest}
            onChange={(e) => setHighest(Number(e.target.value))}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
