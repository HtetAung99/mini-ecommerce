"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, DollarSign, Percent } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import clsx from "clsx";
import Link from "next/link";
import { Promotion } from "@prisma/client";
import { useEffect, useState } from "react";
import { ProductWithImage } from "@/app/types";

export default function ProductCard({
  product,
  flex,
  promotionId,
}: {
  product: ProductWithImage;
  flex: boolean;
  promotionId?: number | null;
}) {
  const [promotion, setPromotion] = useState<Promotion | null>();
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    if (promotionId) {
      fetch("/api/promotions/?promotionId=" + promotionId).then(async (res) => {
        setPromotion(await res.json());
      });
    }

    if (product.imageUrl) {
      console.log("before", product.imageUrl);

      fetch("/api/products/image", {
        body: JSON.stringify({ imgUrl: product.imageUrl }),
        method: "POST",
      })
        .then(async (res) => res.json())
        .then(({ url }) => {
          console.log("after", url);
          setImage(url);
        });

      // s3.getSignedUrlPromise("getObject", bucketParams)
      //   .then((url: string) => {
      //     setImage(url);
      //     console.log("url", url);
      //   })
      //   .catch((err: any) => {
      //     console.log("error", err);
      //   });
    }
  }, [product.imageUrl]);

  return (
    <Card
      key={product.id}
      className={clsx("col-span-1 h-[400px] shadow-sm", flex && "min-w-[20%]")}
    >
      <CardHeader className="h-[55%] w-full p-4">
        <Avatar className="h-full w-full rounded-sm hover:scale-105">
          <AvatarImage
            className="object-contain"
            src={image}
            alt={product.imageUrl}
          />
          {/* <img src={image} alt="" /> */}

          <Bookmark className="absolute right-2 top-2 rounded-sm bg-white p-1 text-red-600" />
          {promotionId && (
            <Badge
              className="absolute bottom-2 left-2 items-center"
              variant={"destructive"}
            >
              {promotion?.discountType === "PERCENTAGE" ? (
                <>
                  {promotion.discount} <Percent size={"14px"} />
                </>
              ) : (
                <>
                  <DollarSign size={"14px"} /> {promotion?.discount}
                </>
              )}
            </Badge>
          )}
          <AvatarFallback>{product.title}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="pb-0">
        <CardTitle className="flex flex-col gap-2 text-base">
          <Link className="h-[5vh]" href={`/products/${product.id}`}>
            {product.title}
          </Link>
          <span className="flex w-[40%] flex-row items-center text-sm font-normal">
            <DollarSign size={"14px"} />
            {product.price}
          </span>
        </CardTitle>

        <CardDescription className={cn("flex h-[70px] flex-col gap-4 pt-3")}>
          <HoverCard openDelay={10}>
            <HoverCardTrigger className="line-clamp-3">
              {product.description}
            </HoverCardTrigger>
            <HoverCardContent className="">
              {product.description}
            </HoverCardContent>
          </HoverCard>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
