"use client";
import { editProduct } from "@/app/actions/product";
import MyComboBox from "@/app/admin/products/components/combobox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export type ProductEditFormValues = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  description?: string;
  published?: boolean;
};

type Category = {
  id: number;
  name: string;
};

export default function ProductEditForm({
  categories,
  product,
}: {
  categories: Category[];
  product: Product;
}) {
  const { toast } = useToast();
  const [selected, setSelected] = useState(
    categories.filter((c) => c.id === product.categoryId)[0],
  );
  const [published, setPublished] = useState(product.published);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditFormValues>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: ProductEditFormValues) => {
    data.id = product.id;
    data.categoryId = selected.id;
    data.published = published;

    try {
      await editProduct(data);
      toast({
        title: "Product updated successfully",
      });
    } catch (e: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: e.message,
      });
    }

    router.back();
  });
  return (
    <form className="w-full">
      <Card className="m-auto flex max-h-[80vh] w-1/2 flex-col overflow-auto rounded-md  bg-slate-50 p-5 px-7  shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold leading-7 tracking-wide">
            Edit Product General Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col items-start ">
            <label
              htmlFor="title"
              className="text-right text-sm font-medium leading-9 tracking-wide"
            >
              Product Title
            </label>
            <Input
              {...register("title", {
                required: "Product Name is required",
                maxLength: {
                  value: 20,
                  message: "Title should be less than 20 characters",
                },
              })}
              defaultValue={product?.title}
              className="mb-2 w-full rounded-md bg-slate-200"
              type="text"
              name="title"
              id="title"
            />
            {errors?.title && (
              <p className="my-2 pl-1 text-sm italic text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-start">
            <label
              htmlFor="description"
              className="text-right text-sm font-medium leading-9 tracking-wide"
            >
              Description (optional)
            </label>
            <textarea
              defaultValue={product?.description || ""}
              {...register("description")}
              className="mb-2 h-24 max-h-24 w-full max-w-full rounded-md bg-slate-200 p-2 p-4 text-xs"
              name="description"
              id="description"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              className="text-right text-sm font-medium leading-9 tracking-wide"
              htmlFor="category"
            >
              Category
            </label>

            <MyComboBox
              selected={selected}
              setSelected={setSelected}
              categories={categories}
            />
          </div>
          <div className="flex flex-col items-start ">
            <label
              className="text-right text-sm font-medium leading-9 tracking-wide"
              htmlFor="price"
            >
              Price
            </label>

            <Input
              className="mb-2 w-full rounded-md bg-slate-200"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              defaultValue={product?.price}
              placeholder="$ "
              type="number"
              name="price"
              id="price"
            />
            {errors?.price && (
              <p className="my-2 pl-1 text-sm italic text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="mt-3 flex items-center gap-4">
            <label
              htmlFor="published"
              className="cursor-pointer text-sm font-medium leading-9 tracking-wide peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Published
            </label>
            <Checkbox
              checked={published}
              onCheckedChange={() => setPublished(!published)}
              id="published"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="my-3 flex w-full flex-row items-center justify-between border-slate-300 ">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
              className={cn("secondary-btn w-1/4 ")}
            >
              Cancel
            </button>
            <button onClick={onSubmit} className={cn("primary-btn w-1/4")}>
              Create
            </button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
