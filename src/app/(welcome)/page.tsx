import React, { useEffect, useState } from "react";
import StoreLocator from "../(home)/components/store-locator";
import { Store } from "@prisma/client";
import { getStores } from "../utils/stores";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function WelcomePage() {
  const stores: Store[] = await getStores();
  return (
    <div className="flex h-screen w-full items-center justify-between shadow-lg">
      <Card className="m-auto h-fit w-1/3">
        <CardHeader>
          <CardTitle className="leading-10 tracking-wide">
            Choose Your Nearest Store
          </CardTitle>
          <CardDescription className="leading-8">
            Select your default store based on your current location or choose
            manually!
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <StoreLocator stores={stores} />
        </CardContent>
      </Card>
    </div>
  );
}
