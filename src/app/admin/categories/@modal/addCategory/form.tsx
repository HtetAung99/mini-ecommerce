"use client";

import { addCategory } from "@/app/actions/category";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm, Resolver } from "react-hook-form";
type FormValues = {
  name: string;
};

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.name ? values : { ...values, name: undefined },
//     errors: !values.name
//       ? {
//           name: {
//             type: "required",
//             message: "Category Name is required.",
//           },
//         }
//       : {},
//   };
// };

export default function ModalForm({
  parent,
  searchParams,
}: {
  parent: number | null;
  searchParams: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await addCategory({
      ...data,
      parentId: Number(parent) || null,
    });

    onDismiss();
  });

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const { rootId, firstId } = searchParams;

  const getCatName = async (id: Number) => {
    const res = await fetch(`/api/categories?id=${id}`, { method: "GET" });
    const data = await res.json();

    return data.name;
  };

  return (
    <Card className="my-2 min-w-[30vw] max-w-[50vw] p-4 ">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Add new category
        </CardTitle>
      </CardHeader>
      <CardContent className="my-4">
        <form>
          <div className="grid w-full items-center justify-items-start gap-4">
            <div className="mb-4 flex flex-row items-center gap-2 text-sm font-bold leading-8 tracking-wider text-blue-500">
              {rootId && (
                <>
                  <p className="text-sm font-semibold">{getCatName(rootId)}</p>
                  <ChevronRight size={18} className="" />
                </>
              )}

              {firstId && (
                <>
                  <p className="text-sm font-semibold">{getCatName(firstId)}</p>
                  <ChevronRight size={18} className="" />
                </>
              )}
            </div>
            <div className="flex w-full items-center gap-5">
              <Label
                className="text-base font-semibold leading-9 tracking-wider"
                htmlFor="name"
              >
                Name:{" "}
              </Label>
              <Input
                {...register("name", {
                  required: "Category Name is required.",
                })}
                id="name"
                placeholder="Category Name to be appended or added"
              />
            </div>

            {errors.name && (
              <p className="pl-1 text-sm italic text-red-600">
                {errors?.name?.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4">
        <button
          onClick={onDismiss}
          className={cn("secondary-btn hover:bg-red-500")}
        >
          Cancel
        </button>
        <button onClick={onSubmit} className="primary-btn hover:bg-blue-700 ">
          Create
        </button>
      </CardFooter>
    </Card>
  );
}
