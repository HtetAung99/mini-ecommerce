"use client";
import React, { useState } from "react";
import AddressSelection from "./address-selection";
import AddressCreateForm from "./address-create-form";

export default function AddressModal({ title }: { title: string }) {
  const [selection, setSelection] = useState(true);
  return (
    <>
      {selection ? (
        <AddressSelection title={title} setSelection={setSelection} />
      ) : (
        <AddressCreateForm setSelection={setSelection} />
      )}
    </>
  );
}
