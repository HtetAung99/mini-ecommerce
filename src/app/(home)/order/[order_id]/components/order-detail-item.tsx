import { AttributeValue } from "@prisma/client";
import prisma from "../../../../../../lib/prisma";

export default async function OrderDetailItem({ item }: { item: any }) {
  const category = await prisma.category.findUnique({
    where: { id: item.product.categoryId },
  });
  const price = item.product.price + item.priceDiff;
  return (
    <div className="border border-slate-300 p-2">
      <h3 className="p-3 text-lg capitalize tracking-wide">
        {category?.name} - {item.product.title} -{" "}
        {item.attributeValues.map((att: AttributeValue) => att.name).join(" ")}
      </h3>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex gap-10">
          <img
            className="m-auto w-24 object-contain p-3"
            src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376542_sd.jpg;canvasHeight=200;canvasWidth=200"
            alt="airpods max"
          />
          <div className="flex flex-col gap-2 py-2">
            <span className="flex w-56 gap-2  text-sm tracking-wide">
              <p className="w-1/2 font-semibold  ">Item Id:</p>
              <p>{item.id}</p>
            </span>
            <span className="flex w-56 gap-2 text-sm tracking-wide">
              <p className="w-1/2 font-semibold ">Variant:</p>
              <p className="capitalize">
                {item.attributeValues
                  .map((att: AttributeValue) => att.name)
                  .join(" ")}
              </p>
            </span>
            <span className="flex w-56 gap-2 text-sm tracking-wide">
              <p className="w-1/2 font-semibold ">Quantity:</p>
              <p>{item.quantity}</p>
            </span>
          </div>
        </div>
        <div className="flex basis-1/5 flex-col gap-2 py-2">
          <span className="flex text-sm tracking-wide">
            <p className="w-1/2 font-semibold">Item Price:</p>
            <p>$ {price.toFixed(2)}</p>
          </span>
          <span className="flex text-sm tracking-wide">
            <p className="w-1/2 font-semibold ">Item Total:</p>
            <p>$ {(price * item.quantity).toFixed(2)}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
