import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
// import { ProductAvailability } from "@prisma/client";
import { revalidatePath } from 'next/cache';

// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   // console.log(data);

//   try {
//     const result = await prisma.productAvailability.create({ data });
//     console.log(result);
//     return NextResponse.json({
//       revalidated: true,
//       now: Date.now(),
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({
//       status: 500,
//       message: "Internal Server Error",
//     });
//   }
// }

// export async function PUT(request: NextRequest) {
//   const data = await request.json();

//   try {
//     const updated_data = await prisma.productAvailability.update({
//       where: { id: data.id },
//       data: { quantity: Number(data.quantity) },
//     });

//     return NextResponse.json({
//       revalidated: true,
//       data: updated_data,
//       now: Date.now(),
//     });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: 'Internal Server Error' });
//   }
// }
