import { Button } from "@/components/ui/button";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/app/context/store-provider";
import { Stock } from "@prisma/client";

export default function StockSheet({ stockList }: { stockList: Stock[] }) {
  const { storeLists } = useStore();

  if (!stockList) {
    return null;
  }

  let modifiedStoreList = storeLists.map((store) => {
    return {
      ...store,
      distance: store.distance.toFixed(2),
      units:
        stockList.find((stock) => stock.storeId === store.id)?.quantity || 0,
    };
  });

  return (
    <div className="my-2 leading-10 tracking-wider">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-0 pl-0" variant="link">
            See stock availability for Pick up
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <span className="border-b-2 border-slate-700 pb-4 leading-10">
                Pick Up Location and Available Stock
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-3 flex flex-col">
            {modifiedStoreList.map((store) => (
              <div
                key={store.id}
                className="border-b border-slate-500 p-2 text-base "
              >
                <h3 className="font-semibold leading-10">
                  {store.name}{" "}
                  <span className="text-sm font-medium text-slate-600">
                    ({store.distance} km away)
                  </span>
                </h3>
                <p className="leading-8 text-gray-600">{store.address}</p>
                <div className="text-sm leading-10">
                  {store.units > 0 ? (
                    <span className="font-semibold text-green-500">
                      {store.units} unit(s) left
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Out of stock!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
