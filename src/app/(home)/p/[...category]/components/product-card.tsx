import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, DollarSign, Percent } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { ProductWithNestedData } from "@/app/types";
import clsx from "clsx";
import Link from "next/link";
import { Product } from "@prisma/client";

export default function ProductCard({
  product,
  flex,
}: {
  product: Product;
  flex: boolean;
}) {
  return (
    <Card
      key={product.id}
      className={clsx("col-span-1 h-[400px] shadow-sm", flex && "min-w-[20%]")}
    >
      <CardHeader className="h-[55%] w-full p-4">
        <Avatar className="h-full w-full rounded-sm hover:scale-105">
          <AvatarImage src="https://images.unsplash.com/photo-1577210897949-1f56f943bf82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=560&h=540&q=80&crop=bottom" />

          <Bookmark className="absolute right-2 top-2 rounded-sm bg-white p-1 text-red-600" />
          <Badge
            className="absolute bottom-2 left-2 items-center"
            variant={"destructive"}
          >
            {50}
            <Percent size={"14px"} />
          </Badge>
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
