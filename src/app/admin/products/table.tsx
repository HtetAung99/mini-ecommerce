import Link from "next/link";
import Row from "./row";
import { getProductsWithCategories } from "@/app/utils/products";
import prisma from "../../../../lib/prisma";

export default async function Table() {
  const products = await getProductsWithCategories(); // for pagination

  // const products = await prisma.product.findMany({
  //   where: {
  //     variants: { some: { attributeValues: { some: { name: "blue" } } } },
  //   },
  //   include: {
  //     category: true,
  //     variants: {
  //       include: { attributeValues: { include: { attribute: true } } },
  //     },
  //   },
  // });
  // console.log(products);

  return (
    <div className="flex flex-col gap-2 mt-12">
      {products.map((product) => (
        <Link href={`/admin/products/${product.id}`}>
          <Row product={product} />
        </Link>
      ))}
    </div>
  );
}
