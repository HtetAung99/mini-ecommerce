"use client";
import { ShippingMethod, ShippingType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";

interface OrderContextProps {
  shippingType: ShippingType;
  setShippingType: (method: any) => void;
  addressId: number | undefined;
  setAddressId: (id: number) => void;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: any) => void;
}

export const OrderContext = createContext<OrderContextProps>({
  shippingType: ShippingType.DELIVERY,
  setShippingType: () => {},
  addressId: 0,
  setAddressId: () => {},
  shippingMethod: ShippingMethod.STANDARD,
  setShippingMethod: () => {},
});

export const shippingConstants = {
  [ShippingMethod.STANDARD]: {
    fee: 0,
    duration: "(5 - 7 working days)",
  },
  [ShippingMethod.NEXTDAY]: {
    fee: 7,
    duration: "(delivered next day)",
  },
  [ShippingMethod.ONEDAY]: {
    fee: 10,
    duration: "(instant delivery)",
  },
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [shippingType, setShippingType] = useState(ShippingType.DELIVERY);
  const [shippingMethod, setShippingMethod] = useState(ShippingMethod.STANDARD);

  const selectedAddress = useSession().data?.user.selectedAddress;
  const [addressId, setAddressId] = useState(selectedAddress?.id);

  return (
    <OrderContext.Provider
      value={{
        shippingType,
        setShippingType,
        shippingMethod,
        setShippingMethod,
        addressId,
        setAddressId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
