import prisma from "../../../lib/prisma";
import { getOrdersForAdmin } from "../utils/orders";
import OrderFilterHeader from "./components/order-filter-header";
import OrderList from "./components/order-list";

export default async function AdminPage() {
  return <h1>Landing Page</h1>;
}
