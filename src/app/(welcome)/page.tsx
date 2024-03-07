import React from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ShieldX, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { error } = searchParams;
  const stores: Store[] = await getStores();
  const coookie = cookies();
  if (!error && coookie.get("defaultStore")) {
    return redirect("/products");
  }
  return (
    <div className="flex h-screen w-full items-center justify-between shadow-lg">
      {error ? (
        <Alert className="m-auto h-fit w-1/3">
          <AlertTitle className="flex flex-row items-center gap-2 leading-10 tracking-wider">
            <ShieldX className="h-4 w-4" />
            Access Denied!
          </AlertTitle>
          <AlertDescription className="pl-6 font-semibold text-red-500">
            {error}
          </AlertDescription>
          <Button asChild variant={"link"}>
            <Link className="my-2 ml-auto w-fit text-sm tracking-wide" href="/">
              Go to main page
            </Link>
          </Button>
        </Alert>
      ) : (
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
      )}
    </div>
  );
}
