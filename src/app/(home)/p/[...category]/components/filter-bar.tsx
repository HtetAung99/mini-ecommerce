import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import PriceSlider from "./price-slider";
import { Button } from "@/components/ui/button";
import { CategoryWithChild } from "@/app/types";
import { getCategoriesNested } from "@/app/utils/categories";
import CategoryFilter from "./category-filter";
import Link from "next/link";

export default async function filterBar({ params }: { params: any }) {
  const categories: CategoryWithChild[] = await getCategoriesNested();

  return (
    <div className="col-span-1 mt-5 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center space-x-3 mx-4">
        <Checkbox id="stock" />
        <label
          htmlFor="stock"
          className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Show in-stock only
        </label>
      </div>
      <Separator />

      <CategoryFilter categories={categories} />
      <Separator />

      <PriceSlider />
      <Separator />

      <Button
        asChild
        className="text-red-500 self-end p-0 m-0"
        variant={"link"}>
        <Link href={`/p/${params.category.join("/")}`}>Clear all filters</Link>
      </Button>
    </div>
  );
}
