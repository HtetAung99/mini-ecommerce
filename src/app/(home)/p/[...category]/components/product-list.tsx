import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductWithNestedData } from '@/app/types';
import ProductCard from './product-card';

export default function ProductList({
  products,
}: {
  products: ProductWithNestedData[];
}) {
  return (
    <ScrollArea className='max-h-[72vh] overflow-y-auto col-span-3 no-scrollbar'>
      <div className='grid grid-cols-3 gap-x-7 gap-y-7 p-5'>
        {products.map((product) => (
          <ProductCard flex={false} product={product} />
        ))}
      </div>
    </ScrollArea>
  );
}
