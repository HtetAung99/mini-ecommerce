"use client";

import { Store } from "@prisma/client";
import { useState, useEffect, use } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useStore } from "@/app/context/store-provider";

const StoreLocator = ({ stores }: { stores: Store[] }) => {
  const { location, error, storeLists } = useStore();
  const router = useRouter();

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleContinue = async () => {
    const res = await fetch("/api/store-session", {
      method: "POST",
      body: JSON.stringify({ defaultStore: selectedStore }),
    });
    if (res.ok) {
      const defaultStore = JSON.parse(Cookies.get("defaultStore")!);
      if (!defaultStore) {
        router.push("/");
        return;
      }
      router.push(`/products?storeId=${defaultStore.id}`);
    }
  };

  useEffect(() => {
    if (location) setSelectedStore(storeLists[0]);
  }, [location, storeLists]);

  return (
    <div className="m-auto flex w-fit flex-col justify-center">
      {location ? (
        <div className="flex capitalize">
          <h3 className="text-lg font-medium leading-7 tracking-wide">
            Your nearest store: {selectedStore?.name.toLowerCase()}
          </h3>
        </div>
      ) : (
        <div>
          {error ? (
            <>
              <h4 className="mb-4 text-base font-semibold leading-10 tracking-wider text-red-500">
                Location access is denied!
              </h4>
              <Select
                onValueChange={(val) => {
                  const selectedStore = stores.filter(
                    (store) => store.id.toString() === val,
                  )[0];
                  setSelectedStore(selectedStore);
                }}
              >
                <SelectTrigger className="m-auto mr-3">
                  <SelectValue placeholder="Select Store Manually" />
                </SelectTrigger>
                <SelectContent className="">
                  {stores.map((store) => (
                    <SelectItem value={store.id.toString()}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            <span>Fetching location...</span>
          )}
        </div>
      )}
      {selectedStore && (
        <Button
          onClick={handleContinue}
          className="m-auto my-5 max-w-fit"
          variant={"default"}
        >
          Continue to {selectedStore?.name}
        </Button>
      )}
    </div>
  );
};

const StoreList = ({ stores }: { stores: Store[] }) => {
  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreLocator;
