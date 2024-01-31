import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import PriceSlider from "./price-slider";
import { Button } from "@/components/ui/button";
import { CategoryWithChild } from "@/app/types";
import { getCategoriesNested } from "@/app/utils/categories";
import CategoryFilter from "./category-filter";

export default async function filterBar({ params }: { params: any }) {
  const categories: CategoryWithChild[] = await getCategoriesNested();

  return (
    <div className="col-span-1 mt-5 flex flex-col gap-4 overflow-y-auto">
      <div className="mx-4 flex items-center space-x-3">
        <Checkbox id="stock" />
        <label
          htmlFor="stock"
          className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
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
        className="m-0 self-end p-0 text-red-500"
        variant={"link"}
      >
        <a href={`/p/${params.category.join("/")}`}>Clear all filters</a>
      </Button>
    </div>
  );
}
