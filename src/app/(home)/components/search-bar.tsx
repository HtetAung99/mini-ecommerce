'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchBar() {
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);

  interface ResponseProductData {
    products: ProductSuggestion[];
  }

  interface ProductSuggestion {
    id: number;
    title: string;
  }

  const handleChange = async (query: string) => {
    const resJson: ResponseProductData = await (
      await fetch(`/api/products?q=${query}`)
    ).json();

    setSuggestions(resJson.products);
  };

  return (
    <div className='w-[36%] relative'>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        className={cn('focus-visible:ring-offset-0 focus:shadow-lg')}
        placeholder='Search your items, brands ...'
      />
      {suggestions.length > 0 && (
        <div className='bg-slate-50 cursor-pointer leading-10 text-sm absolute top-12 z-20 w-full overflow-hidden rounded-sm shadow-lg'>
          {suggestions.map((suggestion) => (
            <Link
              onClick={() => setSuggestions([])}
              href={`/products/${suggestion.id}`}
              key={suggestion.id}
              className='pl-4 inline-flex w-full hover:font-semibold hover:bg-slate-200'
            >
              {suggestion.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
