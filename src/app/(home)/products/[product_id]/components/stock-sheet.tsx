import { Button } from "@/components/ui/button";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/app/context/store-provider";

export default function StockSheetk() {
  const { storeLists } = useStore();

  return (
    <div className="my-2 leading-10 tracking-wider">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link">Stocks availability for Pick up</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Pick Up Location and Available Stocks</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-5">
            {storeLists.map((store) => (
              <div className="my-1 border-b border-slate-500 p-2 text-base ">
                <h3 className="font-semibold leading-10 tracking-wider">
                  {store.name}
                </h3>
                <span className="font-medium leading-7 tracking-wide">
                  {store.distance.toFixed(2)} km away
                </span>
              </div>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={() => console.log("gg")} variant={"default"}>
                Select for Pick up
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
