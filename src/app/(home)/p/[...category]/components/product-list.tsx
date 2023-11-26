import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductWithNestedData } from "@/app/types";
import ProductCard from "./product-card";
import { Pagination } from "./pagination";

export default function ProductList({
  products,
  count,
}: {
  products: ProductWithNestedData[];
  count: number;
}) {
  return (
    <div className="w-full col-span-3 ">
      <Pagination count={count} />
      <ScrollArea className="pl-4 overflow-y-auto col-span-3">
        <div className="grid grid-cols-3 gap-x-7 gap-y-7 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} flex={false} product={product} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
