// import { Role } from "@prisma/client";
// import { log } from "console";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

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

// export const config = {
//   matcher: ["/api/products/:function*", "api/categories/:function*"],
// };
