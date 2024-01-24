import React from "react";

export default function OrderDetailItem() {
  return (
    <div className="border border-slate-300 p-2">
      <h3 className="p-2 text-lg tracking-wide">
        Apple - AirPods Max - Sky Blue
      </h3>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex gap-10">
          <img
            className="m-auto w-24 object-contain p-3"
            src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376542_sd.jpg;canvasHeight=200;canvasWidth=200"
            alt="airpods max"
          />
          <div className="flex flex-col gap-2 py-2">
            <span className="flex w-48 gap-2  text-sm tracking-wide">
              <p className="w-1/2 font-semibold  ">Item Id:</p>
              <p>MGYL3AM/A</p>
            </span>
            <span className="flex w-48 gap-2 text-sm tracking-wide">
              <p className="w-1/2 font-semibold ">Variant:</p>
              <p>Sky Blue</p>
            </span>
            <span className="flex w-48 gap-2 text-sm tracking-wide">
              <p className="w-1/2 font-semibold ">Quantity:</p>
              <p>3</p>
            </span>
          </div>
        </div>
        <div className="flex basis-1/5 flex-col gap-2 py-2">
          <span className="flex text-sm tracking-wide">
            <p className="w-1/2 font-semibold">Item Price:</p>
            <p>$ 400</p>
          </span>
          <span className="flex text-sm tracking-wide">
            <p className="w-1/2 font-semibold ">Item Total:</p>
            <p>$ 1200</p>
          </span>
        </div>
      </div>
    </div>
  );
}
