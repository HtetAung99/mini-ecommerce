import NextAuth from "next-auth";
import { authOptions } from "./auth-options";

// async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, authOption);
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
