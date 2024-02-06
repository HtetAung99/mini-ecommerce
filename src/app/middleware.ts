// import { Role } from "@prisma/client";
// import { log } from "console";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextApiResponseServerIo } from "./types";

// // import { authOption } from "./api/auth/[...nextauth]/route";

// // This function can be marked `async` if using `await` inside
// export default async function middleware(request: NextRequest) {
//   console.log("called middleware");
//   const data = await fetch(`http://localhost:3000/api/auth/session`, {
//     headers: {
//       "content-type": "application/json",
//       cookie: request.cookies.toString(),
//     },
//   }).then((res) => res.json());
//   const user = data.user;
//   if (user.role === Role.USER) {
//     return NextResponse.json({
//       success: false,
//       message: "authentication failed",
//       status: 403,
//     });
//   }
//   return NextResponse.next();

//   // const session = await getServerSession(authOption);
//   // if (session?.user.role !== Role.ADMIN) {
//   //   return Response.json(
//   //     { success: false, message: "authentication failed" },
//   //     { status: 401 }
//   //   );
//   // }
// }

// export default async function middleware(
//   request: NextRequest,
//   response: NextApiResponseServerIo,
//   event: NextFetchEvent,
// ) {
//   console.log("called middleware");
//   event.waitUntil(fetch("/api/socket/io"));
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/products/:path*", "api/categories/:path*"],
// };
