"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { CartItem } from "../types";
import { set } from "react-hook-form";

interface CartContextProps {
  items: CartItem[];
  subTotal: number;
  addItem: (item: CartItem) => void;
  addItemQuantity: (id: number) => void;
  setItemQuantity: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  reduceItemQuantity: (id: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  items: [],
  subTotal: 0,
  addItem: () => {},
  addItemQuantity: () => {},
  setItemQuantity: () => {},
  removeItem: () => {},
  reduceItemQuantity: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);

  const addItem = (i: CartItem) => {
    if (items.some((item) => item.variantId === i.variantId)) {
      addItemQuantity(i.variantId);
      return;
    }
    setItems([...items, i]);

    localStorage.setItem("cartItems", JSON.stringify([...items, i]));
  };

  const setItemQuantity = (id: number, qty: number) => {
    let newItemList = items.map((item) => {
      if (item.variantId === id) {
        item.quantity = qty;
      }
      return item;
    });

    setItems(newItemList);
  };

  const addItemQuantity = (id: number) => {
    let newItemList = items.map((item: CartItem) => {
      if (item.variantId === id) {
        item.quantity++;
      }
      return item;
    });

    setItems(newItemList);
    localStorage.setItem("cartItems", JSON.stringify(newItemList));
  };

  const reduceItemQuantity = (id: number) => {
    let newItemList = items
      .map((item: CartItem) => {
        if (item.variantId === id) {
          item.quantity--;
        }
        return item;
      })
      .filter((i: CartItem) => i.quantity > 0);

    setItems(newItemList);

    localStorage.setItem("cartItems", JSON.stringify(newItemList));
  };

  const removeItem = (id: number) => {
    let filteredItems = items.filter((item: CartItem) => {
      return item.variantId !== id;
    });

    setItems(filteredItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
  };

  const calculateSubTotal = (items: CartItem[]) => {
    const subTotal = items.reduce((prev, cur) => {
      console.log(cur);
      return prev + cur.quantity * (cur.price + cur.priceDiff);
    }, 0);

    setSubTotal(subTotal);
  };

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setItems(JSON.parse(localStorage.getItem("cartItems")!));
    }
  }, []);

  useEffect(() => {
    calculateSubTotal(items);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        subTotal,
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
