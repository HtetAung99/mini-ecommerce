"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function StoreList({ productData: pa }: { productData: any }) {
  const router = useRouter();
  const handleEdit = async () => {
    if (!editing) setEditing(true);
    else {
      const res = await fetch("/api/products/availability/", {
        method: "PUT",
        body: JSON.stringify({ id: pa.id, quantity }),
      });
      setEditing(!editing);
      if (res.ok) router.refresh();
    }
  };
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(pa.quantity);
  return (
    <div key={pa.id} className="flex flex-row gap-4">
      <h4>{pa.store.name}</h4>
      {editing ? (
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      ) : (
        <span>{pa.quantity}</span>
      )}
      <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
  );
}

export default StoreList;
