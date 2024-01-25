import { NextRequest, NextResponse } from "next/server";
import { calculateTotal } from "../checkout/route";
import prisma from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/session";
import { redirect } from "next/navigation";

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
      include: { orderItems: { include: { variant: true } } },
    });
    // increase product->orderCount

    newOrder.orderItems.forEach(async (item: any) => {
      await prisma.product.update({
        where: { id: item.variant.productId },
        data: {
          orderCount: {
            increment: item.quantity,
          },
        },
      });
    });

    return NextResponse.json({
      message: "order create success",
      orderId: newOrder.id,
    });

    // stocking
  } catch (error) {
    console.log("order create error", error);
    return NextResponse.json({ message: "order create failed" });
  }
}

export async function PUT(request: NextRequest) {
  const { orderId, paymentStatus, orderStatus } = await request.json();
  console.log(orderId, paymentStatus, orderStatus);

  const res = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: paymentStatus,
      status: orderStatus,
    },
  });
  return NextResponse.json({ message: "order update success" });
}
