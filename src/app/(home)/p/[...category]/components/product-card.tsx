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

export default function ProductCard({
  product,
  flex,
}: {
  product: ProductWithNestedData;
  flex: boolean;
}) {
  return (
    <Card
      key={product.id}
      className={clsx("col-span-1 h-[400px]", flex && "min-w-[25%]")}>
      <CardHeader className="w-full h-[55%] p-4">
        <Avatar className="h-full rounded-sm hover:scale-105 w-full">
          <AvatarImage src="https://images.unsplash.com/photo-1577210897949-1f56f943bf82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=560&h=540&q=80&crop=bottom" />

          <Bookmark className="bg-white p-1 rounded-sm text-red-600 absolute right-2 top-2" />
          <Badge
            className="absolute left-2 bottom-2 items-center"
            variant={"destructive"}>
            {50}
            <Percent size={"14px"} />
          </Badge>
          <AvatarFallback>{product.title}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="pb-0">
        <CardTitle className="flex flex-col text-base gap-2">
          <Link className="h-[5vh]" href={`/products/${product.id}`}>
            {product.title}
          </Link>
          <span className="flex flex-row text-sm w-[40%] font-normal items-center">
            <DollarSign size={"14px"} />
            {product.price}
          </span>
        </CardTitle>

        <CardDescription className={cn("pt-3 flex gap-4 flex-col h-[70px]")}>
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
