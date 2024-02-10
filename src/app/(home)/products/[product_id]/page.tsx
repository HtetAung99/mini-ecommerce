import { getProductById } from "@/app/utils/products";
import CategoryHeader from "./components/category-header";
import ProductInfo from "./components/product-info";
import Image from "next/image";
import { ProductWithNestedData } from "@/app/types";

export default async function ProductDetailPage({
  params,
}: {
  params: { product_id: Number };
}) {
  const product: ProductWithNestedData | null = await getProductById(
    Number(params.product_id),
  );
  if (!product) {
    return <p>Not found</p>;
  }

  return (
    <div className="w-full">
      <CategoryHeader product_id={product.id} />
      <div className=" grid w-full grid-cols-2 gap-10  py-5">
        <Image
          width={700}
          height={500}
          className="rounded-md border-2 border-slate-200 object-cover"
          src={product.variants[0]?.imageUrls[0]}
          alt={product.variants[0]?.imageUrls[0]}
        />

        <ProductInfo product={product} />
      </div>
    </div>
  );
}
