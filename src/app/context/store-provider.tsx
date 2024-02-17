"use client";

import { Store } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

type StoreContextType = {
  storeLists: StoreWithDistance[];
  setStoreLists: (storeLists: StoreWithDistance[]) => void;
  location: any;

  error: string | null;
};

interface StoreWithDistance extends Store {
  distance: number;
}
const StoreContext = createContext<StoreContextType>({
  storeLists: [],
  setStoreLists: () => {},
  location: {},

  error: "",
});

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
export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeLists, setStoreLists] = useState<StoreWithDistance[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    fetch("/api/stores").then(async (res) => {
      const data: Store[] = await res.json();
      setStores(data);
    });
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

      setStoreLists(sortedStores);
    } else {
      setStoreLists(stores.map((store) => ({ ...store, distance: 0 })));
    }
  }, [location, stores]);

  return (
    <StoreContext.Provider
      value={{
        storeLists,
        setStoreLists,
        location,
        error,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
