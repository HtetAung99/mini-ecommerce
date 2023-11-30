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
    <div className="col-span-3 w-full ">
      <Pagination count={count} />
      <ScrollArea className="col-span-3 overflow-y-auto pl-4">
        <div className="grid grid-cols-3 gap-x-7 gap-y-7 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} flex={false} product={product} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
