import prisma from "../../../lib/prisma";
import OrderList from "./components/order-list";

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="">
      <OrderList orders={orders} />
    </main>
  );
}
