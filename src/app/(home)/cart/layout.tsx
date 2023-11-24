import React from 'react';
import CartHeader from './components/cart-header';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartHeader />
      {children}
    </>
  );
}
