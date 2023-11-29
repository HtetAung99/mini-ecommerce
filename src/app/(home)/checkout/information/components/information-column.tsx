import React from 'react';
import ShippingInformation from './shipping/shipping-info';
import PaymentInformation from './payment/payment-info';
import CheckoutStage from './checkout-stage';

export default function InformationColumn() {
  return (
    <div className='flex flex-col gap-7  w-full'>
      <CheckoutStage stage={[true, false]} />
      <ShippingInformation />
      <PaymentInformation />
    </div>
  );
}
