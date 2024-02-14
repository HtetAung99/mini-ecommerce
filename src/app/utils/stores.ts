import { Store } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { cache } from "react";

export const getStores = cache(async () => {
  const stores: Store[] = await prisma.store.findMany({});

  return stores;
});
