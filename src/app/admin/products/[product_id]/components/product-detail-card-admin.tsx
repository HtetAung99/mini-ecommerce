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
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const path = usePathname();

  return (
    <Card className="relative m-auto flex w-full flex-col border-0 p-3 shadow-none ">
      <div className="absolute -right-8 -top-8 flex w-fit cursor-pointer items-center justify-center rounded-full border border-slate-500 bg-black p-2">
        <Link href={`${path}/editProduct`}>
          <Edit className="self-center text-slate-100" size={18} />
        </Link>
      </div>
      <CardHeader className={clsx("gap-8")}>
        <CardTitle>{product.title}</CardTitle>
        <div className="my-4 grid grid-cols-2">
          <div className="ml-7 flex  h-[40vh] w-3/4 flex-row items-center justify-center rounded-lg p-2">
            <div className="mr-3 flex max-h-full  flex-col gap-3 overflow-auto">
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
              className="h-full w-4/5 rounded-lg border border-slate-200 object-fill p-12"
              src={mainImage || "default-product-image.jpg"}
              alt=""
            />
          </div>
          <VaraintOptionsList
            key={variantOptions}
            variantOptionsFromParent={variantOptions}
          />
        </div>
        <CardDescription className="self-start p-7 indent-4 text-base font-medium leading-8 tracking-wider text-slate-400">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
