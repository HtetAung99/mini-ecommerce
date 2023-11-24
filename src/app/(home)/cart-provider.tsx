'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '../types';

interface CartContextProps {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  addItemQuantity: (id: number) => void;
  setItemQuantity: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  reduceItemQuantity: (id: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  items: [],
  addItem: () => {},
  addItemQuantity: () => {},
  setItemQuantity: () => {},
  removeItem: () => {},
  reduceItemQuantity: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (i: CartItem) => {
    localStorage.setItem('cartItems', JSON.stringify([...items, i]));
    setItems([...items, i]);
  };

  const setItemQuantity = (id: number, qty: number) => {
    let newItemList = items.map((item) => {
      if (item.variantId === id) {
        item.quantity = qty;
      }
      return item;
    });

    setItems(newItemList);
    localStorage.setItem('cartItems', JSON.stringify(newItemList));
  };

  const addItemQuantity = (id: number) => {
    let newItemList = items.map((item) => {
      if (item.variantId === id) {
        item.quantity++;
      }
      return item;
    });

    setItems(newItemList);
    localStorage.setItem('cartItems', JSON.stringify(newItemList));
  };

  const reduceItemQuantity = (id: number) => {
    let targetItem: CartItem | undefined;
    let filteredItems = items.filter((item: CartItem) => {
      if (item.variantId === id) {
        targetItem = item;
      }
      return item.variantId !== id;
    });

    if (targetItem && targetItem.quantity > 1) {
      targetItem.quantity--;
      setItems([...filteredItems, targetItem]);
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...filteredItems, targetItem])
      );
    } else {
      setItems(filteredItems);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
    }
  };

  const removeItem = (id: number) => {
    let filteredItems = items.filter((item: CartItem) => {
      return item.variantId !== id;
    });

    setItems(filteredItems);
    localStorage.setItem('cartItems', JSON.stringify(filteredItems));
  };

  useEffect(() => {
    if (localStorage.getItem('cartItems')) {
      setItems(JSON.parse(localStorage.getItem('cartItems')!));
    }
    console.log(localStorage.getItem('cartItems'));
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addItemQuantity,
        setItemQuantity,
        removeItem,
        reduceItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
