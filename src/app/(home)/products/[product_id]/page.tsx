import { getProductById } from "@/app/utils/products";
import CategoryHeader from "./components/category-header";
import ProductInfo from "./components/product-info";
import { ProductWithNestedData, VariantWithAttributeValues } from "@/app/types";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Bucket, s3 } from "../../../../../lib/aws";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import ProductImageDisplay from "./components/product-image-display";

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

  const unflattedImages = await Promise.all(
    product.variants.map(async (currentVariant: VariantWithAttributeValues) => {
      try {
        const tmp = await Promise.all(
          currentVariant.imageUrls.map(async (imgUrl) => {
            const command = new GetObjectCommand({
              Bucket: Bucket,
              Key: imgUrl!,
            });
            const url = await getSignedUrl(s3, command);
            return url;
          }),
        );
        return tmp;
      } catch (error) {
        console.error("Error retrieving object:", error);
        return [];
      }
    }),
  );

  const images = unflattedImages.flat();

  return (
    <div className="w-full">
      <CategoryHeader product_id={product.id} />
      <div className=" grid w-full grid-cols-2 gap-10  py-5">
        {/* <Image
          width={700}
          height={500}
          className="rounded-md border-2 border-slate-200 object-contain"
          src={images[0]}
          alt={images[0]}
        /> */}
        <ProductImageDisplay images={images} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
