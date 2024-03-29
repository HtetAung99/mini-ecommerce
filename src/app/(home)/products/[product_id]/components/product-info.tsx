"use client";

import {
  AttributeValueWithAttribute,
  ProductWithNestedData,
} from "@/app/types";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, ShoppingCart } from "lucide-react";
import { retrieveAttributesObject } from "@/app/utils/variants";
import { useCart } from "@/app/hooks/useCart";
import { useSocket } from "@/app/context/socket-provider";
import { useRouter } from "next/navigation";
import BuyNow from "./buy-now";
import StockSheet from "./stock-sheet";

export default function ProductInfo({
  product,
}: {
  product: ProductWithNestedData;
}) {
  const [productState, setProductState] =
    useState<ProductWithNestedData>(product);
  const [selectedVariantPair, setSelectedVariantPair]: any[] = useState({});
  const [variantOptions, setVariantOptions]: any[] = useState([]);
  const [price, setPrice]: [price: null | Number, setPrice: any] =
    useState(null);
  const router = useRouter();

  const attributeValues: AttributeValueWithAttribute[] =
    retrieveAttributesObject(product.variants);

  const handleChange = (key: string, name: string) => {
    setSelectedVariantPair({ ...selectedVariantPair, [key]: name });
  };

  const { addItem, buyNow } = useCart();
  const { isConnected, socket } = useSocket();

  useEffect(() => {
    const variantList = productState.variants.map((v) =>
      v.attributeValues.reduce(
        (prev, cur) => {
          return { ...prev, [cur.attribute.name]: cur.name };
        },
        {
          p: (Number(productState.price) + Number(v.priceDiff)).toFixed(2),
        },
      ),
    );

    setVariantOptions(variantList);
    const { p, ...firstVariant } =
      variantList.length > 1 ? variantList[1] : variantList[0];

    setSelectedVariantPair(firstVariant);
  }, [productState]);

  useEffect(() => {
    if (isConnected) {
      socket?.on("admin", (data: any) => {
        setProductState((prev) => ({ ...prev, price: data.price }));
      });
      return () => {
        socket?.disconnect();
      };
    }
  }, [isConnected, socket]);

  useEffect(() => {
    if (variantOptions.length === 1) {
      setPrice(variantOptions[0].p);
    } else {
      const validPair = variantOptions.filter((t: any) => {
        return Object.keys(t).every((k) => {
          if (k === "default") {
            return false;
          }
          if (k != "p" && k !== "default") {
            return t[k] === selectedVariantPair[k];
          } else return true;
        });
      });

      const priceForSelected = validPair[0]?.p;
      setPrice(priceForSelected);
    }
  }, [selectedVariantPair]);

  const extractStockFromVariantPair = () => {
    const stockList = productState.variants.filter((v) => {
      return v.attributeValues.every((av) => {
        if (selectedVariantPair[av.attribute.name]) {
          return av.name === selectedVariantPair[av.attribute.name];
        }
      });
    })[0]?.stocks;

    return stockList;
  };

  const handleAddToCart = () => {
    const variants = productState.variants.filter((v) => {
      return v.attributeValues.every((av) => {
        if (selectedVariantPair[av.attribute.name]) {
          return av.name === selectedVariantPair[av.attribute.name];
        }
      });
    });

    addItem({
      variantId: variants[0].id,
      quantity: 1,
      price: productState.price,
      priceDiff: variants[0].priceDiff,
    });
  };

  const handleBuyNow = (qty: number) => {
    const variants = productState.variants.filter((v) => {
      return v.attributeValues.every((av) => {
        if (selectedVariantPair[av.attribute.name]) {
          return av.name === selectedVariantPair[av.attribute.name];
        }
      });
    });
    buyNow({
      variantId: variants[0].id,
      quantity: qty,
      price: productState.price,
      priceDiff: variants[0].priceDiff,
    });
    router.push("/checkout/information");
  };

  return (
    <Card className="m-auto flex h-full w-full flex-col border-0">
      <CardHeader className={clsx("gap-8")}>
        <span>
          <CardTitle>{productState.title}</CardTitle>
        </span>
        <CardDescription>{productState.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {price && <StockSheet stockList={extractStockFromVariantPair()} />}
        {Object.entries(attributeValues).map(([key, value]: [string, any]) => {
          if (key !== "default")
            return (
              <div key={key}>
                <h3 className="my-2 w-[10vw] pt-2 text-left text-base font-semibold capitalize text-slate-700">
                  {key}
                </h3>

                <div className="flex flex-row justify-items-center gap-5">
                  {Array.from(value).map((v: any) => {
                    v = JSON.parse(v);

                    if (key === "color") {
                      return (
                        <div
                          key={v.id}
                          className={clsx(
                            "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full",
                            selectedVariantPair[key] === v.name && [
                              " border border-gray-700",
                            ],
                          )}
                          onClick={() => handleChange(key, v.name)}
                        >
                          <div
                            className={clsx(
                              "h-5 w-5 rounded-full border border-gray-500 ",
                              `bg-${v.name}-500`,
                            )}
                          ></div>
                        </div>
                      );
                    } else {
                      return (
                        <Button
                          variant={
                            selectedVariantPair[key] === v.name
                              ? "default"
                              : "outline"
                          }
                          key={v.id}
                          onClick={() => handleChange(key, v.name)}
                        >
                          {v.name}
                        </Button>
                      );
                    }
                  })}
                </div>
              </div>
            );
        })}

        <Badge
          className={clsx("mt-5 h-10 flex-1 gap-3 px-3 py-2")}
          variant={"secondary"}
        >
          {price ? (
            <>
              <CircleDollarSign />
              {price}
            </>
          ) : (
            "This combination is not found!"
          )}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={!price}
          onClick={() => handleAddToCart()}
          className="flex items-center justify-around gap-3"
          variant="outline"
        >
          <ShoppingCart />
          Add To Cart
        </Button>
        {price && <BuyNow handleBuyNow={handleBuyNow} />}
      </CardFooter>
    </Card>
  );
}
