import { OrderContext, shippingConstants } from "@/app/context/order-provider";
import { useCart } from "@/app/hooks/useCart";
import { CartItem } from "@/app/types";
import { Button } from "@/components/ui/button";
import { OrderStatus, PaymentStatus, ShippingMethod } from "@prisma/client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

import React, { useContext, useEffect, useState } from "react";

export default function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const { items } = useCart();
  const { data } = useSession();

  console.log(data);
  const orderItems = items.map((item: CartItem) => {
    return { id: item.variantId, quantity: item.quantity };
  });
  const { addressId, shippingType, shippingMethod } = useContext(OrderContext);

  const [message, setMessage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const handleOrder = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/order/", {
        method: "POST",
        body: JSON.stringify({
          items: orderItems,
          shippingFee: shippingConstants[shippingMethod].fee,
          tax: 8.5,
          shippingMethod: shippingMethod,
          shippingType: shippingType,
        }),
      });
      const { orderId } = await res.json();

      const { error }: { error: StripeError } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,

        confirmParams: {
          return_url:
            "http://localhost:3000/order/orderSuccess?orderId=" + orderId,
        },
      });
      // handle the result from `stripe.confirmPayment`
      if (error) {
        console.log("Payment failed!");

        const res = await fetch("/api/order/", {
          method: "PUT",
          body: JSON.stringify({
            orderId,
            paymentStatus: PaymentStatus.FAILED,
            orderStatus: OrderStatus.CANCELED,
          }),
        });
      } else {
        const res = await fetch("/api/order/", {
          method: "PUT",
          body: JSON.stringify({
            orderId,
            paymentStatus: PaymentStatus.SUCCESS,
            OrderStatus: OrderStatus.PROCESSING,
          }),
        });
      }
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } catch (error: any) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleOrder}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <Button
        id="submit"
        disabled={isLoading || !stripe || !elements}
        type="submit"
        className="mt-5 w-full"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
