"use client";
import React, { useState } from "react";
import AddressSelection from "./address-selection";
import AddressCreateForm from "./address-create-form";

export default function AddressModal() {
  const [selection, setSelection] = useState(true);
  return (
    <>
      {selection ? (
        <AddressSelection setSelection={setSelection} />
      ) : (
        <AddressCreateForm setSelection={setSelection} />
      )}
    </>
  );
}
