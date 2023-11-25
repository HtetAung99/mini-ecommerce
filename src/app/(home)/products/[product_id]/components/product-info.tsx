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
import { CircleDollarSign, CreditCard, ShoppingCart } from "lucide-react";
import { retrieveAttributesObject } from "@/app/utils/variants";
import { useCart } from "@/app/hooks/useCart";

export default function ProductInfo({
  product,
}: {
  product: ProductWithNestedData;
}) {
  const [selectedVariantPair, setSelectedVariantPair]: any[] = useState({});
  const [variantOptions, setVariantOptions]: any[] = useState([]);
  const [price, setPrice]: [price: null | Number, setPrice: any] =
    useState(null);

  const attributeValues: AttributeValueWithAttribute[] =
    retrieveAttributesObject(product.variants);

  const handleChange = (key: string, name: string) => {
    setSelectedVariantPair({ ...selectedVariantPair, [key]: name });
  };

  const { addItem } = useCart();

  useEffect(() => {
    const variantList = product.variants.map((v) =>
      v.attributeValues.reduce(
        (prev, cur) => {
          return { ...prev, [cur.attribute.name]: cur.name };
        },
        { p: (Number(product.price) + Number(v.priceDiff)).toFixed(2) }
      )
    );

    setVariantOptions(variantList);
    const { p, ...firstVariant } =
      variantList.length > 1 ? variantList[1] : variantList[0];

    setSelectedVariantPair(firstVariant);
  }, []);

  useEffect(() => {
    if (variantOptions.length === 1) {
      setPrice(variantOptions[0].p);
    } else {
      const validPair = variantOptions.filter((t: any) => {
        return Object.keys(t).every((k) => {
          if (k != "p" && k !== "default") {
            return t[k] === selectedVariantPair[k];
          } else return true;
        });
      });

      const priceForSelected = validPair[1]?.p;
      setPrice(priceForSelected);
    }
    console.log(selectedVariantPair);
  }, [selectedVariantPair]);

  const handleAddToCard = () => {
    const variants = product.variants.filter((v) => {
      return v.attributeValues.every((av) => {
        if (selectedVariantPair[av.attribute.name]) {
          return av.name === selectedVariantPair[av.attribute.name];
        }
      });
    });
    addItem({ variantId: variants[0].id, quantity: 1 });
  };

  return (
    <Card className="m-auto w-[40%] flex flex-col border-0">
      <CardHeader className={clsx("gap-8")}>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {Object.entries(attributeValues).map(([key, value]: [string, any]) => {
          if (key !== "default")
            return (
              <div key={key}>
                <h3 className="capitalize font-semibold text-left text-base my-2 text-slate-700 pt-2 w-[10vw]">
                  {key}
                </h3>

                <div className="flex flex-row justify-items-center gap-5">
                  {Array.from(value).map((v: any) => {
                    v = JSON.parse(v);

                    if (key === "color") {
                      return (
                        <>
                          <div
                            key={v.id}
                            className={clsx(
                              "cursor-pointer flex w-7 h-7 rounded-full justify-center items-center",
                              selectedVariantPair[key] === v.name && [
                                " border-gray-700 border",
                              ]
                            )}
                            onClick={() => handleChange(key, v.name)}>
                            <div
                              className={clsx(
                                "w-5 h-5 rounded-full border border-gray-500 ",
                                `bg-${v.name}-500`
                              )}></div>
                          </div>
                        </>
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
                          onClick={() => handleChange(key, v.name)}>
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
          className={clsx("px-3 py-2 flex-1 gap-3 mt-5 h-10")}
          variant={"secondary"}>
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
          onClick={() => handleAddToCard()}
          className="flex justify-around items-center gap-3"
          variant="outline">
          <ShoppingCart />
          Add To Cart
        </Button>
        <Button className="flex justify-around items-center gap-3">
          <CreditCard />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
