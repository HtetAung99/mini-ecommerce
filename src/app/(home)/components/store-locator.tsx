"use client";

import { Store } from "@prisma/client";
import { useState, useEffect } from "react";

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

      console.log(sortedStores[0]);
    }
  }, [location]);

  return (
    <div>
      {location ? (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      ) : (
        <div>
          {error ? (
            <button>Select Store</button>
          ) : (
            <span>Fetching location...</span>
          )}{" "}
        </div>
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
