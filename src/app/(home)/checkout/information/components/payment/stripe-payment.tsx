import React, { useContext, useEffect, useState } from "react";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError, loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import getConfig from "next/config";
import { OrderContext, shippingConstants } from "@/app/context/order-provider";
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from "@/app/types";
import StripeCheckout from "./stripe-checkout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_CLIENT_ID as string,
);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { shippingMethod } = useContext(OrderContext);
  const { items } = useCart();
  const orderItems = items.map((item: CartItem) => {
    return { id: item.variantId, quantity: item.quantity };
  });

  const createPaymentIntent = async () => {
    const res = await fetch("/api/checkout/create-paymentIntent", {
      method: "POST",
      body: JSON.stringify({
        items: orderItems,
        shippingFee: shippingConstants[shippingMethod].fee,
        tax: 8.5,
      }),
    });
    const { clientSecret } = await res.json();
    return clientSecret;
  };
  useEffect(() => {
    createPaymentIntent().then((clientSecret) => {
      console.log(clientSecret);

      setClientSecret(clientSecret);
    });
  }, []);

  const options = {
    // passing the client secret obtained in step 3
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <div className="my-5">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckout />
        </Elements>
      )}
    </div>
  );
}
