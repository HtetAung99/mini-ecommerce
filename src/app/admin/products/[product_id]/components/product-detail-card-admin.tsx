"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import clsx from "clsx";
import { ProductWithNestedData, VariantWithAttributeValues } from "@/app/types";
import VaraintOptionsList from "./variant-option-list";
import { set } from "date-fns";

export default function ProductDetailCardAdmin({
  product,
  attributeValues,
}: {
  product: ProductWithNestedData;
  attributeValues: any;
}) {
  const [images, setImages] = useState<string[]>();
  const [mainImage, setMainImage] = useState<string>();
  const [variantOptions, setVariantOptions]: any[] = useState([]);
  useEffect(() => {
    const variantList = product.variants.map((v) =>
      v.attributeValues.reduce(
        (prev, cur) => {
          return { ...prev, [cur.attribute.name]: cur.name };
        },
        {
          price: (Number(product.price) + Number(v.priceDiff)).toFixed(2),
          id: v.id,
        },
      ),
    );

    setVariantOptions(variantList);
  }, [product.variants]);

  useEffect(() => {
    const fetchedImages = async () => {
      const imgUrls = product.variants
        .map((v: VariantWithAttributeValues) => v.imageUrls)
        .flat();
      const fetchedUrls = await Promise.all(
        imgUrls.map(async (i) => {
          const res = await fetch("/api/products/image?imgUrl=" + i);
          const { url } = await res.json();
          return url;
        }),
      );
      setImages(fetchedUrls);
    };
    fetchedImages();
  }, [product.variants]);

  useEffect(() => {
    if (product.imageUrl) {
      fetch("/api/products/image?imgUrl=" + product.imageUrl)
        .then(async (res) => res.json())
        .then(({ url }) => {
          setMainImage(url);
        });
    }
  }, []);

  return (
    <Card className="relative m-auto flex w-full flex-col border-0 p-7">
      <div className="absolute -right-8 -top-8 flex w-fit cursor-pointer items-center justify-center rounded-full border border-slate-500 bg-black p-2">
        <Edit className="self-center text-slate-100" size={18} />
      </div>
      <CardHeader className={clsx("gap-8")}>
        <CardTitle>{product.title}</CardTitle>
        <div className="grid grid-cols-2">
          <div className="mx-auto flex flex-row items-center justify-center rounded-lg p-2">
            <div className="mr-3 flex flex-col gap-3">
              {images?.map((i: string) => (
                <img
                  onClick={() => setMainImage(i)}
                  key={i}
                  className="h-12 w-12 cursor-pointer self-end object-contain"
                  src={i || "default-product-image.jpg"}
                />
              ))}
            </div>
            <img
              className="w-2/3 rounded-lg border border-slate-200 object-fill p-12"
              src={mainImage || "default-product-image.jpg"}
              alt=""
            />
          </div>
          <CardDescription className="self-start p-7 indent-4 text-base font-medium leading-8 tracking-wider text-slate-400">
            {product.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {/* {Object.entries(attributeValues).map(([key, value]: [string, any]) => {
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
                          )}
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
                      return <Button key={v.id}>{v.name}</Button>;
                    }
                  })}
                </div>
              </div>
            );
        })} */}
        <VaraintOptionsList
          key={variantOptions}
          variantOptionsFromParent={variantOptions}
        />
      </CardContent>
    </Card>
  );
}
