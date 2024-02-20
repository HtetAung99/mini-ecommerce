import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import prisma from "../../../../lib/prisma";
import { getStores } from "@/app/utils/stores";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default async function StorePage() {
  const stores = await getStores();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-lg font-semibold leading-9 tracking-wider">
          Store Management
        </h4>
        {/* parallel routing with modal */}
        <Button asChild className=" px-4">
          <Link href={"#"}>Add Store</Link>
        </Button>
      </div>
      <Separator className="my-5" />
      <div className="grid grid-cols-2 gap-3">
        {stores.map((store) => (
          <Card className="">
            <CardHeader>
              <CardTitle className={cn("text-lg font-bold")}>
                {store.name}
              </CardTitle>
              <CardDescription>{store.address}</CardDescription>
              <CardDescription>{store.phone}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row-reverse justify-between">
              <Button variant={"outline"} asChild className="px-6">
                <Link href={"#"}>Manage Store</Link>
              </Button>
              <Button variant={"outline"} asChild className="px-6">
                <Link href={"#"}>Store DashBoard</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
