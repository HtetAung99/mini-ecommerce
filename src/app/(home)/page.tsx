import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { getProductsWithCategories } from "../utils/products";
import ProductCard from "./p/[...category]/components/product-card";

export default async function Home({}) {
  const session = await getServerSession(authOption);
  const user: any = session?.user;
  const products = await getProductsWithCategories();

  return (
    <div className="flex max-h-fit flex-col m-auto items-center justify-between  py-2">
      {/* {user && <Link href={"/api/auth/signout"}>{user.name}</Link>} */}
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex flex-col gap-5 w-full overflow-auto md:flex-row">
        {products.map((product) => (
          <ProductCard flex={true} product={product} />
        ))}
      </div>
    </div>
  );
}
