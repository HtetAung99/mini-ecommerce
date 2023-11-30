import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { getProductsWithCategories } from "../utils/products";
import ProductCard from "./p/[...category]/components/product-card";

export default async function Home({}) {
  const session = await getServerSession(authOption);
  const products = await getProductsWithCategories();

  return (
    <div className="m-auto flex max-h-fit flex-col items-center justify-between  py-2">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex w-full flex-col gap-5 overflow-auto md:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} flex={true} product={product} />
        ))}
      </div>
    </div>
  );
}
