import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Bucket, s3 } from "../../../../lib/aws";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function Row({ product }: { product: any }) {
  const command = new GetObjectCommand({
    Bucket: Bucket,
    Key: product.variants[0].imageUrls[0] || "default-product-image.jpg"!,
  });

  product.imgUrl = await getSignedUrl(s3, command);

  return (
    <div
      key={product.id}
      className="flex items-center justify-between rounded-lg border-b bg-white p-2"
    >
      <div className="flex w-2/5 items-center">
        <img
          className="mr-5 h-14 w-14 rounded-lg bg-gray-700 object-contain"
          src={product.imgUrl}
        />

        <div className="w-72 truncate">
          <h3 className="font-semibold">{product.title}</h3>
          <span className="text-sm text-gray-400">{product.description}</span>
        </div>
      </div>
      <div className="w-1/5">
        <span className="text-gray-600">{product.category.name}</span>
      </div>
      <div className="w-1/5">
        <span className="text-gray-600">${product.price}</span>
      </div>
      <div>
        <span className="text-gray-400">Actions</span>
      </div>
    </div>
  );
}
