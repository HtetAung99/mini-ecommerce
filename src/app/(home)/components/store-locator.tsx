"use client";

import { Store } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const StoreLocator = ({ stores }: { stores: Store[] }) => {
  const router = useRouter();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const failure = (error: GeolocationPositionError) => {
      setError(`Geolocation error: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  useEffect(() => {
    if (location) {
      const sortedStores = stores
        .map((store) => ({
          ...store,
          distance: calculateDistance(
            location.latitude,
            location.longitude,
            store.lat,
            store.long,
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      setSelectedStore(sortedStores[0]);
    }
  }, [location]);

  // if (defaultStore) {
  //   return redirect(`/products?storeId=${defaultStore.id}`);
  // }

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
