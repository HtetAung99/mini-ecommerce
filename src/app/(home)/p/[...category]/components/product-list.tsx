import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductWithNestedData } from '@/app/types';
import ProductCard from './product-card';
import Link from 'next/link';

export default function ProductList({
  products,
}: {
  products: ProductWithNestedData[];
}) {
  return (
    <ScrollArea className='pl-4 overflow-y-auto col-span-3'>
      <div className='grid grid-cols-3 gap-x-7 gap-y-7 p-4'>
        {products.map((product) => (
          <ProductCard flex={false} product={product} />
        ))}
      </div>
    </ScrollArea>
  );
}
