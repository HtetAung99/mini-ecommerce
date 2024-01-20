// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { isAuthenticted } from "../../../../../lib/session";
import { redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_API_CLIENT_SECRET);

export async function POST(request: NextRequest) {
  const isLogin: boolean = await isAuthenticted();

  if (!isLogin) redirect("/admin/categories/?message=authFailed");
  const { items, shippingFee, tax } = await request.json();

  const total = await calculateTotal(items, shippingFee, tax);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  //   return NextResponse.json({ clientSecret: "test" });
}

export const calculateTotal = async (
  items: any,
  shippingFee: number,
  tax: number,
) => {
  const orderItems = await prisma.variant.findMany({
    where: { id: { in: items.map((item: any) => item.id) } },
    include: { product: true },
  });

  let total = orderItems.reduce((prev, cur) => {
    return (
      prev +
      (cur.product.price + cur.priceDiff) *
        items.find((item: any) => item.id === cur.id).quantity
    );
  }, 0);

  total += shippingFee;
  total *= 1 + tax / 100;

  return Math.round(total * 100);
};
