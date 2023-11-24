'use client';

import { useCart } from '@/app/hooks/useCart';
import OrderItem from './order-item';

export default function OrderItemList() {
  const { items } = useCart();
  return (
    <div className='grow max-h-[38vw] py-3 px-1 mt-5 overflow-x-auto'>
      {items.map((item) => (
        <OrderItem item={item} />
      ))}
    </div>
  );
}
