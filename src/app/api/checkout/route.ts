// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getCurrentUser, isAuthenticted } from "../../../../lib/session";
import { redirect } from "next/navigation";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { calculateTotal } from "@/app/utils/orders";

const stripe = require("stripe")(process.env.STRIPE_API_CLIENT_SECRET);

export async function POST(request: NextRequest) {
  const isLogin: boolean = await isAuthenticted();

  if (!isLogin) redirect("/admin/categories/?message=authFailed"); // why redirect to admin/categories?
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
}

export async function GET(req: NextRequest) {
  const paymentIntentId = req.nextUrl.searchParams.get("paymentIntentId");

  const isLogin: boolean = await isAuthenticted();
  if (!isLogin) {
    return NextResponse.json(
      {
        message: "not authenticated",
      },
      {
        status: 400,
      },
    );
  }

  const userId = (await getCurrentUser())?.id;

  const orderId = req.nextUrl.searchParams.get("orderId");
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent && paymentIntent.status === "succeeded") {
      // Handle successful payment here
      const respond = await prisma.order.update({
        where: { id: orderId!, customerId: userId },
        data: {
          paymentStatus: PaymentStatus.SUCCESS,
          status: OrderStatus.PROCESSING,
        },
      });

      return NextResponse.json({ respond }, { status: 200 });
    } else {
      // Handle unsuccessful, processing, or canceled payments and API errors here
      const respond = await prisma.order.update({
        where: { id: orderId!, customerId: userId },
        data: {
          paymentStatus: PaymentStatus.FAILED,
          status: OrderStatus.CANCELED,
        },
      });
      return NextResponse.json({ respond }, { status: 200 });
    }
  } catch (error: any) {
    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json({ message: "Payment Failed" }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Internal server error. Please contact administrators" },
        { status: 500 },
      );
    }
  }
}
