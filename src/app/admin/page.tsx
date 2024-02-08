import prisma from "../../../lib/prisma";
import { getOrdersForAdmin } from "../utils/orders";
import OrderFilterHeader from "./components/order-filter-header";
import OrderList from "./components/order-list";

export default async function AdminPage() {
  const orders = await getOrdersForAdmin();

  return (
    <main className="">
      <OrderFilterHeader />
      <OrderList orders={orders} />
    </main>
  );
}
