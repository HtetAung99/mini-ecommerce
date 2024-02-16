"use client";
import { buttonVariants } from "@/components/ui/button";
import { Store } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DefaultStore() {
  const [defaultStore, setDefaultStore] = useState<Store | null>(null);
  useEffect(() => {
    const store = JSON.parse(Cookies.get("defaultStore")!);
    setDefaultStore(store);
  }, []);
  return (
    <Link className={buttonVariants({ variant: "ghost" })} href={"/"}>
      {defaultStore?.name}
    </Link>
  );
}
