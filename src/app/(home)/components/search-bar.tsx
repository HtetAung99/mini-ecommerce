"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function SearchBar() {
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [onFocus, setOnFocus] = useState(false);

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
    <div className="relative w-full md:w-[36%]">
      <Input
        onFocus={() => setOnFocus(true)}
        onBlur={() => {
          setTimeout(() => setOnFocus(false), 100);
        }}
        onChange={(e) => handleChange(e.target.value)}
        className={cn("focus:shadow-lg focus-visible:ring-offset-0")}
        placeholder="Search your items, brands ..."
      />
      {suggestions.length > 0 && onFocus && (
        <div
          id="suggestion"
          className="absolute top-12 z-20 w-full cursor-pointer overflow-hidden rounded-sm bg-slate-50 text-sm leading-10 shadow-lg"
        >
          {suggestions.map((suggestion) => (
            <Link
              onClick={() => setSuggestions([])}
              href={`/products/${suggestion.id}`}
              key={suggestion.id}
              className="inline-flex w-full pl-4 hover:bg-slate-200 hover:font-semibold"
            >
              {suggestion.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
