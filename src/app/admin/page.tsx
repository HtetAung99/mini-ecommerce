import { link } from "fs";
import prisma from "../../../lib/prisma";
import { Order } from "@prisma/client";

export default async function AdminPage() {
  const orders = await prisma.order.findMany();

  return (
    <main className="">
      {orders.map((order: Order) => (
        <li key={order.id}>{order.id}</li>
      ))}
    </main>
  );
}
