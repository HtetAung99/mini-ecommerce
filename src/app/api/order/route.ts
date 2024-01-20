import { NextRequest, NextResponse } from "next/server";
import { calculateTotal } from "../checkout/create-paymentIntent/route";
import prisma from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/session";
import { redirect } from "next/navigation";
import { connect } from "http2";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/categories/?message=authFailed");
  const { items, shippingFee, tax, shippingMethod, shippingType } =
    await request.json();

  const total = await calculateTotal(items, shippingFee, tax);

  try {
    const newOrder = await prisma.order.create({
      data: {
        customerId: user?.id,
        totalAmount: total,
        orderItems: {
          create: items.map((item: any) => {
            return {
              variantId: item.id,
              quantity: item.quantity,
            };
          }),
        },
        addressID: user?.selectedAddress.id,
        shippingMethod: shippingMethod,
        shippingType: shippingType,
      },
    });

    return NextResponse.json({
      message: "order create success",
      orderId: newOrder.id,
    }); // stocking
  } catch (error) {
    console.log("order create error", error);
    return NextResponse.json({ message: "order create failed" });
  }
}

export async function UPDATE(request: NextRequest) {
  const { orderId, paymentStatus } = await request.json();
  const res = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: paymentStatus,
    },
  });
  return NextResponse.json({ message: "order update success" });
}
