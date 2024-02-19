"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Store } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DefaultStore() {
  const [defaultStore, setDefaultStore] = useState<Store | null>(null);
  useEffect(() => {
    const store = JSON.parse(Cookies.get("defaultStore") || "null");
    setDefaultStore(store);
  }, []);
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        Cookies.remove("defaultStore");
        setDefaultStore(null);
        return router.push("/");
      }}
    >
      {defaultStore?.name}
    </Button>
  );
}
