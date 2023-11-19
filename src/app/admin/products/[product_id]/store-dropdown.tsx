"use client";
import { Store } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function StoreDropDown({
  productId,
  filteredStores,
}: {
  productId: Number;
  filteredStores: Store[];
}) {
  const router = useRouter();
  const [storeId, setStoreId] = useState(filteredStores[0]?.id);
  const handleClick = async () => {
    const res = await fetch("/api/products/availability", {
      method: "POST",
      body: JSON.stringify({ productId, storeId }),
    });
    console.log(await res.json());

    if (res.ok) router.refresh();
  };
  return (
    <div>
      {filteredStores.length != 0 && (
        <div>
          <select
            defaultValue={storeId}
            name="store"
            id="store"
            onChange={(e) => setStoreId(Number(e.target.value))}>
            {filteredStores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button onClick={() => handleClick()}>Add Store</button>
        </div>
      )}
    </div>
  );
}

export default StoreDropDown;
