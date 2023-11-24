'use client';

import { useCart } from '@/app/hooks/useCart';

export default function CartHeader() {
  const { items } = useCart();
  return <h5>{`Cart ( ${items.length} )`}</h5>;
}
